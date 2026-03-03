import { redirect } from "next/navigation"
import { fetchOrderDetails } from "../../../api/api"
import { cookies } from "next/headers"

export default async function ResultPage({searchParams}){
    const cookieStore = await cookies()
    const params = await searchParams
    const pay = Number(await params?.pay)
    const OrderId = await params?.id
    console.log(OrderId)
    const res = await fetchOrderDetails(OrderId, cookieStore.toString())
    const order = await res.json()
    console.log(order)
    if (!OrderId){
        redirect('/')
    }
    if (!OrderId){
        console.log('mất')
    }
    return (<div>Đặt hàng thành công</div>)
}