import { redirect } from "next/navigation"
import { getMe, postLogout} from "../../api/api"
import { cookies } from "next/headers"
import './user.css'
import { BiUser } from "react-icons/bi"
import ProfileSideBar from "./profileSideBar"
export default async function UserPage(){
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()
    const res_user = await getMe({Cookie: allCookies})

    const user = await res_user.json()
    
    if (user?.message){
        redirect('/login')
    }
    console.log("In user pgae",user)
    return (

        <div className="profileLayout">

            <ProfileSideBar active={'profile'}></ProfileSideBar>

            <div className="profileContent">

                <div className="profileCard">

                    <div className="profileLeft">
                        <div className="profileAvatar">
                            {user?.avt == 'default'? <BiUser></BiUser>:<img src={user?.avt}></img>}
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
                            {user?.profile?.address?.map((item)=>(
                                <p className="addressRow" key={item.id}>{item?.number} {item?.street}, {item?.ward}, {item?.city}</p>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}