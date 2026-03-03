'use client'
import { payStatus, payMethod, orderStatus } from "../../../../data/orderStatus";
import { ShowPriceFormat } from "../../../../lib/handleTextShow";
import ConfirmForm from "../../../../components/confirmForm";
import { useEffect, useState } from "react";
import { cancelOrder } from "../../../../api/api";
import { useNoti } from "../../../../notification";
import { redirect } from "next/navigation";
import { handleStorage } from "../../../../lib/handleStorage";
export default function DetailShow({order}){
    const [showConfirm, setShowConfirm] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [confirmDetail, setConfirmDetail] = useState(null)
    const {setMessage, setType} = useNoti()
    
    const handleReOrder = (order)=>{
        handleStorage({'list_ids': order.list_ids, mode: 'reOrder'}, 'checkout');
        redirect('/checkout')
    }
    useEffect(()=>{
        if(order?.message || order?.detail){
            setMessage('Không tìm thấy đơn hàng!')
            setType('warning')
            setTimeout(()=>redirect('/user/order'),1000)
            
        }
    }, [])
    

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
    return (
    <div className="orderDetailContent">
    {showConfirm? <ConfirmForm callFirstFunc={handleCancel} detail={confirmDetail} type={'orderCancel'} callEndFunc={setShowConfirm} kwargs={toDelete}></ConfirmForm>:null}
      <h1>Chi tiết đơn hàng</h1>
      <p className="orderId">Mã đơn: {order?.id}</p>

      {/* ===== Thông tin giao hàng ===== */}
      <div className="shippingInfo">
        <h3>Thông tin nhận hàng</h3>
        <p><strong>Người nhận:</strong> {order?.receiver_name}</p>
        <p><strong>SĐT:</strong> {order?.receiver_phone}</p>
        <p>
          <strong>Địa chỉ:</strong>{" "}
          {order?.number} {order?.street}, {order?.ward}, {order?.city}
        </p>
      </div>

      {/* ===== Meta đơn hàng ===== */}
      <div className="orderMeta">
        <div>
          <p className="metaInfo"><strong>Ngày đặt:</strong> <span>{order?.date}</span></p>
          <p className="metaInfo"><strong>Trạng thái đơn:</strong> <span> {orderStatus[order?.order_status]}</span></p>
          <p className="metaInfo"><strong>Thanh toán:</strong> <span>{payStatus[order?.pay_status]}</span></p>
          <p className="metaInfo"><strong>Phương thức:</strong> <span>{payMethod[order?.method]}</span></p>
        </div>

        <div className="orderTotal">
          <p><strong>Tổng tiền:</strong></p>
          <h2>{ShowPriceFormat(order?.total)}₫</h2>
        </div>
      </div>

      {/* ===== Danh sách sản phẩm ===== */}
      <div className="orderItems">
        {order?.details?.map((item, index) => (
          <a key={index} href={`/products/${item?.product?.id}`} className="orderItem">
            <div className="itemImage">
              <img
                src={item.product?.thumbnail}
                alt={item.product?.name}
              />
            </div>

            <div className="itemInfo">
              <h3>{item.product?.name}</h3>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá mua: {ShowPriceFormat(item?.current_price)}₫</p>
            </div>

            <div className="itemSubtotal">
              <strong>
                {ShowPriceFormat(item.sub_total)}₫
              </strong>
            </div>
          </a>
        ))}
      </div>

      {/* ===== Action buttons ===== */}
      <div className="orderActions">
        <button className="reOrderBtn" onClick={()=> handleReOrder(order)}>Đặt lại</button>
        <button className="cancelBtn" disabled={order?.order_status==-1} onClick={()=>{handleToConfirm(order)}}>Hủy đơn</button>
        <button className="payBtn" disabled={order?.pay_status == 2 || order?.order_status==-1}>Thanh toán</button>
      </div>
    </div>
    )
}