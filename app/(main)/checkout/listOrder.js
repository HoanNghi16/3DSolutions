"use client"
import { useEffect, useState } from "react"
import { getPreview, postAddress, postOrder } from "../../api/api"
import { useAuth } from "../../authProvider"
import { ShowPriceFormat } from "../../lib/handleTextShow"

export default function ListOrder(){
    const [previewList, setPreviewList] = useState(null)
    const [message, setMessage] = useState(null)
    const [moreAddress, setMoreAddress] = useState(false)
    const [addError, setAddError] = useState(null)
    const {user} = useAuth()
    const [total, setTotal]= useState(0)
    const [address, setAddress] = useState(null)

    
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
    const addressForm = (<form onSubmit={handleMoreAddress}>
                <input type="text" id='receiver_name' placeholder="Tên nhận hàng"/>
                <input type="tel" id="receiver_phone" placeholder="Số điện thoại nhận hàng"/>
                <input type="text" id="number" placeholder="Số nhà"/>
                <input type="text" id="street" placeholder="Đường"/>
                <input type="text" id="ward" placeholder="Phường"/>
                <input type="text" id="city" placeholder="Thành phố"/>
                <button type="submit">Lưu</button>
                <button type="reset">Hủy</button>
            </form>)

    function addMoreAddress(){
        setMoreAddress((e) => (!e))
    }

    async function handleOrder(form){
        form.preventDefault()
        form = form.target
        if(!address){
            setAddError('Vui lòng chọn địa chỉ')
            console.log(addError)
            return false
        }    
        let {term_id, ...term_address} = user? {id: null,address_id: address?.id}: address //Tạo id ảo để xóa id ra khỏi object nếu nhập form
        let request = {header: {
            method: Number(form.payMethod.value),
            ...term_address,
        }, details: [], list_ids: JSON.parse(window.localStorage.getItem('checkout')).list_ids}

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
            setMessage('Đơn hàng không hợp lệ!')
        }
        return
    }

    useEffect( ()=>{
        async function fetchPreview(req){
            const res = await getPreview(req)
            const data = await res.json()
            if (data?.message){
                setPreviewList([])
                setMessage(data?.message)
            }
            else{
                setPreviewList(data)
            }
        }
        function getStorage(){
            return JSON.parse(window.localStorage.getItem('checkout'))
        }
        fetchPreview(getStorage())
        console.log(previewList)
    },[])

    useEffect(()=>{
        function getTotal(){
            if (previewList){
                let term_total = 0
                for (let item of previewList){
                    term_total +=Number(item?.sub_total)
                }
                return setTotal(term_total)
            }
        }
        getTotal()
    },
    [previewList])
    return (
    <div className="ListOrder">
        <div>
            {user && user?.profile?.address?.length>0 ? (<form>
                <h3>Địa chỉ giao hàng</h3>
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
            <p>{addError}</p>
            {(!address ^ !user)?
                <div>
                    <button type="button" onClick={() => {addMoreAddress()}}>{(!user && address)?"Đổi địa chỉ":"Thêm địa chỉ"}</button>
                </div>
                : null}
            {moreAddress? addressForm: null}
        </div>
        <table border={'true'}>
            <thead>
                <tr>
                    <th colSpan={2}>Sản phẩm</th>
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
                                <img style={{width: '30px', height: '30px'}} src={term_item?.thumbnail}></img>
                            </td>
                            <td>
                                <p>{term_item?.name}</p>
                            </td>
                            <td>
                                <p>
                                    {ShowPriceFormat(term_item?.unit_price)}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {item?.quantity}
                                </p>
                            </td>
                            <td>
                                <p id="total">
                                    {ShowPriceFormat(item?.sub_total)}
                                </p>
                            </td>
                        </tr>
                    )
                }): <tr>
                    <td colSpan={5}>
                        {message}
                    </td>
                </tr>}
            </tbody>
        </table>
        <aside>
            <form onSubmit={handleOrder}>
                <p>Tổng thành tiền: {ShowPriceFormat(total)}</p>
                <select id="payMethod">
                    <option value={0}>Tiền mặt</option>
                    <option value={1}>Chuyển khoản</option>
                </select>
                <p>Địa chỉ đã chọn: {address?`${address?.number} ${address?.street}, ${address?.ward}` : "Chưa chọn địa chỉ"}</p>
                <button type="submit">Order</button>
            </form>
        </aside>
    </div>)
}