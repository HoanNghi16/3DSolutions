import { redirect } from "next/navigation"
import { getMe, fetchOrders } from "../../api/api"
import { cookies } from "next/headers"
export default async function UserPage(){
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()
    console.log(allCookies)
    const res_user = await getMe({Cookie: allCookies})
    const res_orders = await fetchOrders({Cookie: allCookies})

    const user = await res_user.json()
    const orders = await res_orders.json()
    console.log(orders)
    
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