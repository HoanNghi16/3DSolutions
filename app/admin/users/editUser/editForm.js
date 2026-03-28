'use client'
import { putUser } from "../../../api/api"
import { useNoti } from "../../../notification"

export default function EditForm ( {defaultData} ){
    const {setMessage, setType} = useNoti()
    const handlePutUser= async (element)=>{
        setMessage("Đang xử lý")
        let payload = {id: defaultData?.id}
        element.preventDefault()
        let form= element.target

        payload['name'] = form?.name?.value != "" ? form.name.value : defaultData?.profile?.name
        payload['email'] = form?.email?.value != "" ? form.email.value : defaultData?.email
        payload['date_of_birth'] = form?.date_of_birth?.value != "" ? form.date_of_birth.value : defaultData?.profile?.date_of_birth
        payload['phone'] = form?.phone?.value != "" ? form.phone.value : defaultData?.profile?.phone
        console.log(payload)
        if (form.password.value != ""){
            payload['password'] = form.password.value
        }
        const res = await putUser(payload)
        const message = await res.json()
        setMessage(message?.message)
        if (res.ok){
            setType("success")
            setTimeout(()=>window.location.reload(), 1000)
        }else{
            setType("warning")
        }
    }

    return (
        <form onSubmit={(e)=> handlePutUser(e)}>
            <div className="formCard">
                <h3>Chỉnh sửa thông tin người dùng</h3>
                
                <div className="formGrid">
                    <div className="formGroup">
                        <label>Họ Và Tên</label>
                        <input type="text" placeholder={defaultData?.profile?.name} id="name"/>
                    </div>

                    <div className="formGroup">
                        <label>Email</label>
                        <input type="email" placeholder={defaultData?.email} id="email"/>
                    </div>

                    <div className="formGroup">
                        <label>Số điện thoại</label>
                        <input type="text" placeholder={defaultData?.profile?.phone} id="phone"/>
                    </div>

                    <div className="formGroup">
                        <label>Ngày sinh</label>
                        <input type="text" placeholder="dd/mm/yyyy" id="date_of_birth"/>
                    </div>

                    <div className="formGroup">
                        <label>Mật khẩu mới</label>
                        <input type="password" placeholder="••••••••" id="password"/>
                    </div>
                    <div className="formGroup">
                        <label>Vai trò</label>
                        <select id="role" defaultValue={defaultData?.is_superuser == true ? "Admin" : "Customer"}>
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="formActions">
                    <button className="cancelBtn">Hủy</button>
                    <button className="saveBtn" type="submit">Lưu thay đổi</button>
                </div>
            </div>
        </form>
    )
}