"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getPreview, postAddress, postOrder } from "../../api/api"
import { useList } from "../listProvider"
import { useAuth } from "../../authProvider"
import { ShowPriceFormat } from "../../lib/handleTextShow"

export default function ListOrder(){
    const {selected} = useList()
    const params = useSearchParams()
    const [previewList, setPreviewList] = useState(null)
    const [message, setMessage] = useState(null)
    const mode = params.get("mode") ?? "order"
    const [moreAddress, setMoreAddress] = useState(false)
    const [addError, setAddError] = useState(null)
    const {user} = useAuth()
    const [total, setTotal]= useState(0)
    const [address, setAddress] = useState(null)

    
    const handleMoreAddress = async (e)=>{
        e.preventDefault()
        console.log(e, e.target)
        const form = e.target
        const request = {
            receiver_name: form.receiver_name.value,
            receiver_phone: form.receiver_phone.value,
            number: form.number.value,
            street: form.street.value,
            ward: form.ward.value,
            city: form.city.value,
        }
        const res = await postAddress(request)
        if(res.ok){
            setMoreAddress((i) => (!i))
            form.reset()
            window.location.reload()
        }
    }
    const addressForm = (<form onSubmit={handleMoreAddress}>
                <input type="text" id='receiver_name' placeholder="Tên nhận hàng"/>
                <input type="text" id="receiver_phone" placeholder="Số điện thoại nhận hàng"/>
                <input type="text" id="number" placeholder="Số nhà"/>
                <input type="text" id="street" placeholder="Đường"/>
                <input type="text" id="ward" placeholder="Phường"/>
                <input type="text" id="city" placeholder="Thành phố"/>
                <button type="submit">Lưu</button>
            </form>)

    function addMoreAddress(){
        setMoreAddress((e) => (!e))
    }

    async function handleOrder(form){
        form.preventDefault()
        form = form.target
        console.log(form)
        if(!address){
            setAddError('Vui lòng chọn địa chỉ')
            return false
        }
        let request = {header: {
            total: total,
            method: form.payMethod.value,
            ...address,
        }, details: []}

        for (let detail of previewList){
            let term = {product: detail?.product?.id ?? detail, quantity: params.get('quantity')?? detail.quantity}
            request.details.push(term)
        }
        console.log(JSON.stringify(request))
        console.log(request)
        const res = await postOrder(request)
        if(res.ok){
            console.log('ok')
        }
        return
    }

    useEffect( ()=>{
        async function fetchPreview(){
            const req = { mode: mode, list_ids : (mode === "buyNow"? [params.get("product")]: selected), quantity: params.get("quantity")}
            const res = await getPreview(req)
            const data = await res.json()
            if (data?.message){
                setPreviewList(null)
                setMessage(data?.message)
            }
            else{
                setPreviewList(data)
            }
        }
        fetchPreview()
    },[])

    useEffect(()=>{
        function getTotal(){
            if (previewList){
                if (mode === "buyNow"){
                    return setTotal(Number(previewList[0].unit_price)*Number(params.get('quantity')))
                }else{
                    let term_total = 0
                    for (let item of previewList){
                        term_total +=Number(item?.quantity) * Number(item?.product?.unit_price)
                    }
                    return setTotal(term_total)
                }
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
                            let {user, id, ...term} = add
                            setAddError(null)
                            return term})}/>
                        <p>{`${add?.number} ${add?.street}, ${add?.ward}, ${add?.city} `}</p>
                        <p>{" "+add?.receiver_name}</p>
                        <p>{" "+add?.receiver_phone}</p>
                    </div>
                ))}
                <p>{addError}</p>
            </form>): "Không có địa chỉ"}
            <button type="button" onClick={() => addMoreAddress()}>Thêm địa chỉ</button>
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
                {previewList? previewList.map((item) => {
                    let term_item = mode == "buyNow"? item : item?.product
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
                                    {term_item?.unit_price}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {params.get('quantity') ?? item?.quantity}
                                </p>
                            </td>
                            <td>
                                <p id="total">
                                    {ShowPriceFormat(Number(params.get("quantity") ?? item?.quantity)*Number(term_item?.unit_price))}
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
                <button type="submit">Order</button>
            </form>
        </aside>
    </div>)
}