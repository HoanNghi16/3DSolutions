import { orderStatus } from "../../../data/orderStatus"
export default async function EditOrderForm({order}){
    const orderKeys = [-2,-1,0,1,2,3,4]
    return (
        <form>
            <div className="formCard">
                <h3>Chỉnh sửa thông tin đơn hàng</h3>
                <div className="formGrid">
                    <div className="formGroup">
                        <label>Tên người nhận</label>
                        <input type="text" placeholder={order?.receiver_name}/>
                    </div>
                    <div className="formGroup">
                        <label>Số điện thoại nhận hàng</label>
                        <input type="text" placeholder={order?.receiver_phone}/>
                    </div>
                    <div className="formGroup">
                        <label>Số nhà</label>
                        <input type="text" placeholder={order?.number}/>
                    </div>                    
                    <div className="formGroup">
                        <label>Đường</label>
                        <input type="text" placeholder={order?.street}/>
                    </div>
                    <div className="formGroup">
                        <label>Phường</label>
                        <input type="text" placeholder={order?.ward}/>     
                    </div>
                    <div className="formGroup">
                        <label>Thành phố</label>
                        <input type="text" placeholder={order?.city}/>
                    </div>
                    <div className="formGroup">
                        <label>Trạng thái</label>
                        <select>
                            {orderKeys.map((item) => (
                                <option defaultChecked={order?.order_status == item}  key={item} value={item}>{orderStatus[item]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="formActions">
                    <button className="cancelBtn">Hủy</button>
                    <button className="saveBtn">Lưu thay đổi</button>
                </div>
                
            </div>
        </form>
    )
}