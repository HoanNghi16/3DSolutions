"use client"
import { ShowPriceFormat } from '../../lib/handleTextShow'
import ConfirmForm from '../../components/confirmForm'
import { orderStatus } from '../../data/orderStatus' 
import { cancelOrder } from '../../api/api' 
import { useState } from 'react'
import { useNoti } from '../../notification' 
import "./orderRow.css"
export default function AdminOrderRow({order, onEdit}){
    const [showConfirm, setShowConfirm] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [confirmDetail, setConfirmDetail] = useState(null)
    const {setMessage, setType} = useNoti()
    console.log(onEdit)
    const handleToConfirm = (order)=>{
        setShowConfirm(true)
        setToDelete({order_id: order?.id})
        setConfirmDetail(order)
    }
    const handleCancel=(request)=>{
        cancelOrder(request).then((res)=>res.json()).then((res)=> {
            if(res.message){
                setMessage(res.message)
                setType(null)
            }
        })
    }
    return (
        <div>
            {showConfirm? <ConfirmForm callFirstFunc={handleCancel} detail={confirmDetail} type={'orderCancel'} callEndFunc={setShowConfirm} kwargs={toDelete}></ConfirmForm>:null}
            <div className='orderRow' key={order.id}>
                <div className='orderRowHeader'>
                    <p className='orderId'>{order?.id}</p>
                    {
                        onEdit === true ? null : <a className="detailLink" href={`/admin/orders/${order?.id}`}>Chỉnh sửa</a>
                    }  
                </div>
                <div className='orderInfo'>
                    <div className="receiver">
                        <p><b>{order?.receiver_name}</b></p>
                        <p>{order?.receiver_phone}</p>
                        <p>{order?.number+' ' + order?.street+', ' + order?.ward}</p>
                    </div>
                    <p style={{color: 'rgb(228, 0, 0)'}}>{ShowPriceFormat(order?.total)} &#8363;</p>
                    <p className='orderStatus'><b>{orderStatus[order?.order_status]}</b></p>
                </div>
            </div>
        </div>
    )
}