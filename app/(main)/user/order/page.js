import { redirect } from "next/navigation"
import { fetchOrders } from "../../../api/api"
import { cookies } from "next/headers"
import OrderList from "./orderList"
import './order.css'

export default async function OderPage({searchParams}){
    const status = (await searchParams)?.status ?? null
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()
    const res_orders = await fetchOrders({Cookie: allCookies},status)
    if (!res_orders.ok){
        redirect('/login')
    }
    const orders = await res_orders.json()
    return (
    <div className="orderContainer">
        <h1>Danh sách đơn hàng</h1>
        <OrderList orders={orders}></OrderList>
    </div>)
}