"use client"
import {orderStatus} from '../../../data/orderStatus'
import { cancelOrder } from '../../../api/api'
import { ShowPriceFormat } from '../../../lib/handleTextShow'
import ConfirmForm from '../../../components/confirmForm'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useNoti } from '../../../notification'
import { handleStorage } from '../../../lib/handleStorage'
export default function OrderList({orders}){
    const [showConfirm, setShowConfirm] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [confirmDetail, setConfirmDetail] = useState(null)
    const searchParams = useSearchParams()
    const [currentStatus, setCurrentStatus] = useState(searchParams.status)
    const {setMessage, setType} = useNoti()
    const router = useRouter()
    const order_status = [-2,-1,0,1,2,3,4]

    const handleReOrder = (order)=>{
        handleStorage({'list_ids': order.list_ids, mode: 'reOrder'}, 'checkout')
        window.location.href='/checkout'
    }
    
    const handleCancel=(request)=>{
        cancelOrder(request).then((res)=>res.json()).then((res)=> {
            console.log('hoặc tới đây')
            console.log(res)
            if(res.message){
                console.log('tới đây')
                setMessage(res.message)
                setType(null)
            }
        })
    }
    const handleToConfirm = (order)=>{
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
        {showConfirm? <ConfirmForm callFirstFunc={handleCancel} detail={confirmDetail} type={'orderCancel'} callEndFunc={setShowConfirm} kwargs={toDelete}></ConfirmForm>:null}
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
                    <div className='orderRow' key={order.id}>
                        <div className='orderRowHeader'>{order?.id}
                        </div>
                        <div className='orderInfo'>
                            <div className="receiver">
                                <p><b>{order?.receiver_name}</b></p>
                                <p>{order?.receiver_phone}</p>
                                <p>{order?.number+' ' + order?.street+', ' + order?.ward}</p>
                            </div>
                            <p>{ShowPriceFormat(order?.total)} &#8363;</p>
                            <p className='orderStatus'><b>{orderStatus[order?.order_status]}</b></p>
                        </div>
                        <div className='orderButtons'>
                            <button className='reOrder' onClick={()=> handleReOrder(order)}>Đặt lại</button>
                            <button className='cancelOrder' disabled={Number(order?.order_status) === -1} onClick={()=> {
                                handleToConfirm(order)
                            }}>Hủy đơn</button>
                        </div>
                    </div>
                )
            })}
            {orders.length ==0 &&<p className='message'>Không tìm thấy đơn hàng!</p>}
        </div>  )
}