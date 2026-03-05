'use client'
import { useEffect, useState } from "react"
import { orderStatus } from "../data/orderStatus"
import { ShowPriceFormat } from "../lib/handleTextShow"
import './confirmForm.css'
export default function ConfirmForm({callFirstFunc, kwargs, callEndFunc, detail, type}){
    const [detailShow, setDetailShow] = useState(null)
    const [title, setTitle] = useState(null)
    
    useEffect(()=>{
        function changeDetailShow(){
            console.log(detail)
            switch (type){
                case ('orderCancel'):
                    setTitle('hủy đơn')
                    setDetailShow(<>
                        <p><b>Đơn hàng:</b> {detail?.id}</p>
                        <p><b>Trạng thái:</b> {orderStatus[detail?.order_status]}</p>
                        <p><b>Tổng thành tiền:</b> {ShowPriceFormat( detail?.total)} &#8363;</p>
                        <p><b>Địa chỉ giao hàng:</b> {`${detail?.number} ${detail?.street}, ${detail?.ward}`}</p>
                        <p><b>Người nhận:</b> {detail?.receiver_name} ({detail?.receiver_phone})</p>
                        <p><b>Bạn có chắc muốn hủy đơn?</b></p>
                    </>)
                    break;
                case ('cartDelete'):
                    setTitle('xóa sản phẩm')
                    let product = detail?.product
                    setDetailShow(
                    <>
                        <p><b>Sản phẩm:</b> {product?.name}</p>
                        <p><b>Đơn giá:</b> {ShowPriceFormat(product?.unit_price)} &#8363;</p>
                        <p><b>Tổng tiền:</b> {ShowPriceFormat(detail?.sub_total)} &#8363;</p>
                        <p><b>Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng?</b></p>
                    </>)
            }
        }
        changeDetailShow()
    },[])
    function handleConfirm(e){
        e.preventDefault()
        callFirstFunc({...kwargs})
        callEndFunc(false)
        if(type == 'orderCancel'){
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }
    }
    function handleCancel(e){
        e.preventDefault()
        callEndFunc(false)
    }
    return (
    <div className="confirmBackground" onClick={(e)=> {
        if(e.target == e.currentTarget){
            callEndFunc(false)
        }
        }}>
        <div className="confirmContainer">
            <div className="confirmHeader">
                <button className="closeConfirm" onClick={()=>{
                    callEndFunc(false)
                }}>x</button>
                <h3>Xác nhận {title}</h3>
            </div>
            <form>
                {detailShow}
                <button type="submit" onClick={(e)=>handleConfirm(e)}>Xác nhận</button>
                <button type="button" onClick={(e)=>handleCancel(e)}>Hủy</button>
            </form>
        </div>
    </div>)
}