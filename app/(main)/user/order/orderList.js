"use client"
import {orderStatus} from '../../../data/orderStatus'
import { cancelOrder } from '../../../api/api'
import { ShowPriceFormat } from '../../../lib/handleTextShow'
import ConfirmForm from '../../../components/confirmForm'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
export default function OrderList({orders}){
    const [showConfirm, setShowConfirm] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [confirmDetail, setConfirmDetail] = useState(null)
    const searchParams = useSearchParams()
    const [currentStatus, setCurrentStatus] = useState(searchParams.status)
    const router = useRouter()
    const order_status = [-2,-1,0,1,2,3,4]
    const handleCancel = (order)=>{
        console.log('1')
        setShowConfirm(true)
        setToDelete({order_id: order?.id})
        setConfirmDetail(order)
    }

    function handleChooseStatus(status){
        const params = new URLSearchParams(searchParams)
        setCurrentStatus(status)
        params.set('status', status)
        router.push(`?${params.toString()}`)
    }

    return (       
    <div className="orderList">
        <div className="orderFilter">
            <button className={currentStatus==null?"active":"" } onClick={()=>{handleChooseStatus(null)}}>Tất cả</button>
            {order_status.map((item)=>(
                <button key={item} className={item == currentStatus ?'active': ''} onClick={()=> handleChooseStatus(item)}>{orderStatus[item]}</button>
            ))}
        </div>
        {showConfirm? <ConfirmForm callFirstFunc={cancelOrder} detail={confirmDetail} type={'orderCancel'} callEndFunc={setShowConfirm} kwargs={toDelete}></ConfirmForm>:null}
        <div>
            <div className='header'>
                <div className='receiver'>
                    <b>Thông tin người nhận</b>
                </div>
                <p><b>Tổng tiền</b></p>
                <p><b>Trạng thái</b></p>
            </div>
        </div>
            {orders.length > 0 && orders.map((order) => {
                return (
                    <div className='orderRow' key={order.id}>
                        <div className="receiver">
                            <p><b>{order?.receiver_name}</b></p>
                            <p>{order?.receiver_phone}</p>
                            <p>{order?.number+' ' + order?.street+', ' + order?.ward}</p>
                        </div>
                        <p>{ShowPriceFormat(order?.total)} &#8363;</p>
                        <p>{orderStatus[order?.order_status]}</p>
                        <button disabled={Number(order?.order_status) === -1} onClick={()=> {
                            handleCancel(order)
                        }}>Hủy đơn</button>
                    </div>
                )
            })}
            {orders.length ==0 &&<p className='message'>Không tìm thấy đơn hàng!</p>}
        </div>  )
}