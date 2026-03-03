"use client"
import { postAddress } from "../api/api"
import { useAuth } from "../authProvider"
import './addressForm.css'
export default function AddressForm({setAddError, setMoreAddress, setAddress}){
    const {user} = useAuth()
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
    return (<form className="addressForm" onSubmit={handleMoreAddress}>
                <input type="text" id='receiver_name' placeholder="Tên nhận hàng"/>
                <input type="tel" id="receiver_phone" placeholder="Số điện thoại nhận hàng"/>
                <input type="text" id="number" placeholder="Số nhà"/>
                <input type="text" id="street" placeholder="Đường"/>
                <input type="text" id="ward" placeholder="Phường"/>
                <input type="text" id="city" placeholder="Thành phố"/>
                <button className="addressSubmit" type="submit">Lưu</button>
                <button className="addressCancel" type="reset" onClick={()=>setMoreAddress(false)}>Hủy</button>
            </form>)
}