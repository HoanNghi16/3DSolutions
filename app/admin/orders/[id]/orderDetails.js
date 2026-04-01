import { redirect } from "next/navigation"
import { ShowPriceFormat } from "../../../lib/handleTextShow"

export default function OrderDetails({details}){
    if (!details){
        redirect('/admin/orders')
    }
    return (
        <div className="orderDetails">
            <h3>Chi tiết đơn hàng</h3>
            <div className="detailsWrapper">
                {details.map((item)=>(
                    <div key={item?.id} className="adminProductCard">
                        <img className="productThumbnail" src={item?.product?.thumbnail}></img>
                        <div className="productInfo">
                            <h5>{item?.product?.name}<span className="category"> ({item?.product?.category?.name ?? "không có danh mục"})</span></h5>
                            <p>{ShowPriceFormat(item?.current_price)}</p>
                            <p>Số lượng mua: {item?.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}