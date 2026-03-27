import AdminOrdersList from "./adminOrderList";
import { cookies } from "next/headers"
import { fetchAdminOrders } from "../../api/api"
import { redirect } from "next/navigation";
import './orders.css'
export default async function OrdersAdminPage({searchParams}){
    const status = (await searchParams)?.status ?? null
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()
    const res_orders = await fetchAdminOrders({Cookie: allCookies},status)
    const orders = await res_orders.json()
    if (orders?.message){
        redirect('/login')
    }
    return (
    <div className="ordersContainer">
        <div className="ordersWrapper">
            <AdminOrdersList orders={orders}></AdminOrdersList>
        </div>
    </div>)
}