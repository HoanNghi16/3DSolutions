"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { orderStatus } from "../../data/orderStatus";
import AdminOrderRow from "./orderRow";
export default function AdminOrdersList({orders}){
    const searchParams = useSearchParams()
    const router = useRouter()
    const [currentStatus, setCurrentStatus] = useState(searchParams.status)
    const order_status = [-2,-1,0,1,2,3,4]
    function handleChooseStatus(status){
        const params = new URLSearchParams(searchParams)
        setCurrentStatus(status)
        params.set('status', status)
        router.push(`?${params.toString()}`)
    }

    return (       
    <div className="orderList">
        <h1 style={{color: "#111827"}}>Danh sách đơn hàng</h1>
        <div className="orderFilter">
            <button className={currentStatus==null?"active":"" } onClick={()=>{handleChooseStatus(null)}}>Tất cả</button>
            {order_status.map((item)=>(
                <button key={item} className={item == currentStatus ?'active': ''} onClick={()=> handleChooseStatus(item)}>{orderStatus[item]}</button>
            ))}
        </div>
        <div>
            <div className='header'>
                <div className='receiver'>
                    <b>Thông tin người nhận</b>
                </div>
                <p><b>Tổng tiền</b></p>
                <p className='orderStatus'><b>Trạng thái</b></p>
            </div>
        </div>
            {orders.length > 0 && orders.map((order) => {
                return (
                    <AdminOrderRow key={order?.id} order={order} onEdit={false}></AdminOrderRow>
                )
            })}
            {orders.length ==0 &&<p className='message'>Không tìm thấy đơn hàng!</p>}
        </div>  )
}