import { redirect } from "next/navigation"
import { getMe, postLogout} from "../../api/api"
import { cookies } from "next/headers"
import './user.css'
import { BiUser } from "react-icons/bi"
import ProfileSideBar from "./profileSideBar"
import ProfileContent from "./profileContent"
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
            <ProfileContent user={user}></ProfileContent>
        </div>
    )
}