'use client'

import { useState } from "react"
import AddressForm from "../../components/addressForm"
import { BiUpload, BiUser } from "react-icons/bi"
import UploadAvt from "./uploadAvt"

export default function ProfileContent({user}){
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [addressError, setAddressError] = useState(null)
    const [changeAvt, setChangeAvt] = useState(false)
    return (
    <div className="profileContent">
        {changeAvt?<UploadAvt openForm={setChangeAvt}></UploadAvt>:null}
        <div className="profileCard">

            <div className="profileLeft">
                <div className="profileAvatar">
                    {user?.avt == 'default'? <BiUser></BiUser>:<img src={user?.avt}></img>}
                    <div className="changeAvt" onClick={()=>setChangeAvt(i => !i)}>
                        <BiUpload className="uploadIcon"></BiUpload>
                        <p className="uploadContent">Tải ảnh lên</p>
                    </div>
                </div>
                <h2 className="profileName">{user?.profile?.name}</h2>
                <p className="profileRole">{user?.is_superuser? 'Quản trị viên': 'Khách hàng'}</p>
                <button className="editProfileBtn">Chỉnh sửa hồ sơ</button>
            </div>
            <div className="profileRight">
                <div className="infoGroup">
                    <span>Email</span>
                    <p>{user?.email}</p>
                </div>

                <div className="infoGroup">
                    <span>Số điện thoại</span>
                    <p>{user?.profile?.phone}</p>
                </div>

                <div className="infoGroup">
                    <span>Ngày sinh</span>
                    <p>{user?.profile?.date_of_birth}</p>
                </div>

                <div className="infoGroup">
                    <span>Địa chỉ</span>
                    {showAddressForm? <AddressForm setAddError={setAddressError} setMoreAddress={setShowAddressForm}></AddressForm> :(user?.profile?.address?.map((item)=>(
                        <p className="addressRow" key={item.id}>{item?.number} {item?.street}, {item?.ward}, {item?.city}</p>
                    )))}
                    <div className="error">{addressError}</div>
                    <button className="moreAddressBtn" onClick={()=>setShowAddressForm(e=>!e)}>Thêm địa chỉ</button>
                </div>
            </div>

        </div>

    </div>

    )
}