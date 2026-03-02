"use client"
import { useEffect, useState } from "react"
import { getPreview, postAddress, postOrder } from "../../api/api"
import { useAuth } from "../../authProvider"
import { ShowPriceFormat } from "../../lib/handleTextShow"
import { HandleChangeCart } from "../../lib/handleCart"
import { handleStorage } from "../../lib/handleStorage"

export default function ListCheckout(){
    const [previewList, setPreviewList] = useState(null)
    const [checkoutMessage, setCheckoutMessage] = useState(null)
    const [previewRequest, setPreviewRequest] = useState(null)
    const [moreAddress, setMoreAddress] = useState(false)
    const [addError, setAddError] = useState(null)
    const [render, setRender] = useState(false)
    const {user} = useAuth()
    const [total, setTotal]= useState(0)
    const [address, setAddress] = useState(null)
    const [error, setError] = useState(null)
    
    const handleMoreAddress = async (e)=>{
        e.preventDefault()
        const form = e.target
        const request = {
            receiver_name: form.receiver_name.value ?? null,
            receiver_phone: form.receiver_phone.value ?? null,
            number: form.number.value ?? null,
            street: form.street.value ?? null,
            ward: form.ward.value ?? null,
            city: form.city.value ?? null,
        }
        const hasNull = Object.values(request).some(
            value => value === null || value === undefined || value === ""
        )
        if(hasNull){
            setAddError("Vui lòng điền đầy đủ thông tin")
            return
        }
        if(!user){
            setAddress(request)
            setMoreAddress(false)
            setAddError(null)
        }else{
            const res = await postAddress(request)
            if(res.ok){
                setMoreAddress(false)
                setAddError(null)
                form.reset()
                window.location.reload()
            }
            else{
                setAddError('Vui lòng điền đầy đủ thông tin!')
            }
        }
    }

    async function fetchPreview(req){
        if(!req){
            return
        }
        const res = await getPreview(req)
        const data = await res.json()

        if (data?.message){
            getStorage()
            setPreviewList([])
            setError(data?.message)
            return false
        }
        else{
            handleStorage(previewRequest, 'checkout')
            setPreviewList(data)
            setError(null)
            return true
        }
    }
    function getTotal(){
        if (previewList){
            let term_total = 0
            for (let item of previewList){
                term_total +=Number(item?.sub_total)
            }
            return setTotal(term_total)
        }
    }
    function getStorage(){
        setPreviewRequest(JSON.parse(window.localStorage.getItem('checkout')))
        return JSON.parse(window.localStorage.getItem('checkout'))
    }

    const addressForm = (<form onSubmit={handleMoreAddress}>
                <input type="text" id='receiver_name' placeholder="Tên nhận hàng"/>
                <input type="tel" id="receiver_phone" placeholder="Số điện thoại nhận hàng"/>
                <input type="text" id="number" placeholder="Số nhà"/>
                <input type="text" id="street" placeholder="Đường"/>
                <input type="text" id="ward" placeholder="Phường"/>
                <input type="text" id="city" placeholder="Thành phố"/>
                <button type="submit">Lưu</button>
                <button type="reset" onClick={()=>setMoreAddress(false)}>Hủy</button>
            </form>)

    function addMoreAddress(){
        setMoreAddress((e) => (!e))
    }

    async function handleOrder(form){
        form.preventDefault()
        form = form.target
        console.log("test value",form.payMethod)
        if(!address){
            setAddError('Vui lòng chọn địa chỉ!')
            console.log(addError)
            return false
        }   
        let {term_id, ...term_address} = user? {id: null,address_id: address?.id}: address //Tạo id ảo để xóa id ra khỏi object nếu nhập form
        if (form.payMethod.value === ''){
            setError('Vui lòng chọn phương thức thanh toán!')
            return
        }
        let request = {header: {
            method: Number(form.payMethod.value),
            ...term_address,
        }, details: [], list_ids: JSON.parse(window.localStorage.getItem('checkout')).list_ids}
        form.reset()
        for (let detail of previewList){
            console.log(detail)
            let term = {product: detail?.product?.id ?? detail, quantity: detail.quantity}
            request.details.push(term)
        }
        const res = await postOrder(request)

        if(res.ok){
            console.log('ok')
            const result_data = await res.json()
            localStorage.setItem('checkout', JSON.stringify({list_ids: null, mode: 'Order'}))
            window.location.href = `/checkout/result?pay=${request?.header?.method}&id=${result_data?.order_id}`
        }else{
            console.log(res)
            setCheckoutMessage('Đơn hàng không hợp lệ!')
        }
        return
    }


    useEffect( ()=>{
        getStorage()
        console.log(previewRequest)
    },[])
    useEffect(()=>{
        fetchPreview(previewRequest)
        getTotal()
    },[previewRequest])
    useEffect(()=>{
        getTotal()
        setRender(false)
    },
    [previewList, render])
    return (
    <div className="ListOrder">
        <div className="checkoutMain">
            <div className="addressBlock">
                {user && user?.profile?.address?.length>0 ? (<form>
                    <h3 style={{color: '#131a31'}}>Địa chỉ giao hàng</h3>
                    {user?.profile?.address.map((add) => (
                        <div key={`add_${add.id}`} style={{display: 'flex'}}>
                            <input type="radio" name="address" onClick={()=>setAddress(()=>{
                                let {user, ...term} = add
                                setAddError(null)
                                return term})}/>
                            <label name='address'>{`${add?.number} ${add?.street}, ${add?.ward}, ${add?.city} (${add?.receiver_name} ${add?.receiver_phone})`}</label>
                        </div>
                    ))}

                </form>): (address? (<p>{`${address?.number} ${address?.street}, ${address?.ward}, ${address?.city} (${address?.receiver_name} ${address?.receiver_phone})`}</p>) :addressForm)}
                <p className="error">{addError}</p>
                    <div>
                        <button type="button" onClick={() => {addMoreAddress()}}>{(!user && address)?"Đổi địa chỉ":"Thêm địa chỉ"}</button>
                    </div>
                {moreAddress? addressForm: null}
            </div>
            <table className="productTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {previewList && previewList.length > 0? previewList.map((item) => {
                        let term_item = item?.product
                        return (
                            <tr key={term_item?.id}>
                                <td display='flex'>
                                    <img style={{width: '40px', height: '40px'}} src={term_item?.thumbnail}></img>
                                </td>
                                <th>
                                    <p>{term_item?.name}</p>
                                </th>
                                <td>
                                    <p>
                                        {ShowPriceFormat(term_item?.unit_price)} &#8363;
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <input defaultValue={item?.quantity} onBlur={(e)=>{
                                            if(e.target.value == ""){
                                                e.target.value = e.target.defaultValue
                                                return
                                            }
                                            if (Number(item?.quantity) != Number(e.target.value)){
                                                if (previewRequest?.mode === "buyNow"){
                                                    setPreviewRequest((checkout)=> ({...checkout, quantity:Number(e.target.value)}))
                                                }else{
                                                    HandleChangeCart(item?.id, item?.product?.id, Number(e.target.value)).then((res)=>{
                                                        if(res?.message){
                                                            setError(res?.message)
                                                        }
                                                        else{
                                                            fetchPreview(previewRequest)
                                                        }
                                                    })
                                                }
                                            }else{
                                                fetchPreview(previewRequest)
                                            }
                                        }}/>
                                    </p>
                                </td>
                                <td>
                                    <p id="total">
                                        {ShowPriceFormat(item?.sub_total)} &#8363;
                                    </p>
                                </td>
                            </tr>
                        )
                    }): <tr>
                        <td colSpan={5} >
                            <p className="error">{checkoutMessage}</p>
                        </td>
                    </tr>}
                </tbody>
            </table>
        </div>
        <aside>
            <form onSubmit={(e) =>handleOrder(e)}>
                <p><b>Tổng thành tiền: </b>{ShowPriceFormat(total)} &#8363;</p>
                <label><b>Phương thức thanh toán:</b></label>
                <select  id="payMethod" onChange={()=>{setError(null)}}>
                    <option default ></option>
                    <option value={0}>Tiền mặt</option>
                    <option value={1}>Chuyển khoản</option>
                </select>
                <p><b>Địa chỉ đã chọn</b>: {address?`${address?.number} ${address?.street}, ${address?.ward}` : "Chưa chọn địa chỉ"}</p>
                <p className="error">{error}</p>
                <button type="submit" disabled={error !== null}>Đặt hàng</button>
            </form>
        </aside>
    </div>)
}