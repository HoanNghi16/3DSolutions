import { redirect } from "next/navigation"
import { getMe } from "../../api/api"
import { cookies } from "next/headers"
export default async function UserPage(){
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()
    console.log(allCookies)
    const res = await getMe({Cookie: allCookies})
    const user = await res.json()
    if (user?.message){
        redirect('/login')
    }
    console.log("In user pgae",user)
    return (
        <div className="userContainer">
            {user?.profile?.name}
        </div>
    )
}