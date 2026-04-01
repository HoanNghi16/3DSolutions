"use client"
import { putOrder } from "../../../api/api"
import { orderStatus } from "../../../data/orderStatus"
import { useNoti } from "../../../notification"
export default function EditOrderForm({order}){
    const orderKeys = [-2,-1,0,1,2,3,4]
    const {setType, setMessage} = useNoti()
    const handlePutOrder = async (form)=>{
        form.preventDefault()
        setMessage("Đang xử lý...")
        form = form.target
        const request = {order_id: order?.id}
        if (form.receiver_name.value){
            request.receiver_name = form.receiver_name.value
        }
        if (form.receiver_phone.value){
            request.receiver_phone = form.receiver_phone.value
        }
        if (form.number.value){
            request.number = form.number.value
        }
        if (form.street.value){
            request.street = form.street.value
        }
        if (form.ward.value){
            request.ward = form.ward.value
        }
        if (form.city.value){
            request.city = form.city.value
        }
        if (form.order_status.value){
            request.order_status = form.order_status.value
        }
        const res = await putOrder(request)
        setMessage((await res.json()).message)
        if(res.ok){
            setType("success")
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }else{
            setType("warning")
        }
    }
    return (
        <form onSubmit={(e)=>handlePutOrder(e)}>
            <div className="formCard">
                <h3>Chỉnh sửa thông tin đơn hàng</h3>
                <div className="formGrid">
                    <div className="formGroup">
                        <label>Tên người nhận</label>
                        <input type="text" id="receiver_name" placeholder={order?.receiver_name}/>
                    </div>
                    <div className="formGroup">
                        <label>Số điện thoại nhận hàng</label>
                        <input type="tel" id="receiver_phone" placeholder={order?.receiver_phone}/>
                    </div>
                    <div className="formGroup">
                        <label>Số nhà</label>
                        <input type="text" id="number" placeholder={order?.number}/>
                    </div>                    
                    <div className="formGroup">
                        <label>Đường</label>
                        <input type="text" id="street" placeholder={order?.street}/>
                    </div>
                    <div className="formGroup">
                        <label>Phường</label>
                        <input type="text" id="ward" placeholder={order?.ward}/>     
                    </div>
                    <div className="formGroup">
                        <label>Thành phố</label>
                        <input type="text" id="city" placeholder={order?.city}/>
                    </div>
                    <div className="formGroup">
                        <label>Trạng thái</label>
                        <select id="order_status">
                            {orderKeys.map((item) => (
                                <option defaultChecked={order?.order_status == item}  key={item} value={item}>{orderStatus[item]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="formActions">
                    <button className="cancelBtn">Hủy</button>
                    <button type="submit" className="saveBtn">Lưu thay đổi</button>
                </div>
            </div>
        </form>
    )
}