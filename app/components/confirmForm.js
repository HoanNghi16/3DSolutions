'use client'
import { useEffect, useState } from "react"
import { orderStatus } from "../data/orderStatus"
import { ShowPriceFormat } from "../lib/handleTextShow"
import './confirmForm.css'
export default function ConfirmForm({callFirstFunc, kwargs, callEndFunc, detail, type}){
    const [detailShow, setDetailShow] = useState(null)
    
    useEffect(()=>{
        function changeDetailShow(){
            if (type == 'orderCancel'){
                setDetailShow(<>
                    <p><b>Đơn hàng:</b> {detail?.id}</p>
                    <p><b>Trạng thái:</b> {orderStatus[detail?.order_status]}</p>
                    <p><b>Tổng thành tiền:</b> {ShowPriceFormat( detail?.total)} &#8363;</p>
                    <p><b>Địa chỉ giao hàng:</b> {`${detail?.number} ${detail?.street}, ${detail?.ward}`}</p>
                    <p><b>Người nhận:</b> {detail?.receiver_name} ({detail?.receiver_phone})</p>
                    <p><b>Bạn có chắc muốn hủy đơn?</b></p>
                </>)
            }
        }
        changeDetailShow()
    },[])
    function handleConfirm(e){
        e.preventDefault()
        console.log('hủy nè')
        callFirstFunc({...kwargs})
        callEndFunc(false)
        window.location.reload()
    }
    function handleCancel(e){
        e.preventDefault()
        callEndFunc(false)
    }
    return (
    <div className="confirmBackground" onClick={(e)=> {
        if(e.target == e.currentTarget){
            console.log(e.target)
            callEndFunc(false)
        }
        }}>
        <div className="confirmContainer">
            <button className="closeConfirm" onClick={()=>{
                callEndFunc(false)
            }}>x</button>
            <h3>Xác nhận {type == 'orderCancel'? "hủy đơn": ""}</h3>
            <form>
                {detailShow}
                <button type="submit" onClick={(e)=>handleConfirm(e)}>Xác nhận</button>
                <button type="button" onClick={(e)=>handleCancel(e)}>Hủy</button>
            </form>
        </div>
    </div>)
}