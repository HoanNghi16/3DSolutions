import { ShowPriceFormat } from "../../lib/handleTextShow"
import { BiDetail } from "react-icons/bi"
export default function AdminProductCard({product}){

    return (
    <div className="adminProductCard">
        <img className="productThumbnail" src={product?.thumbnail}></img>
        <div className="productInfo">
            <h5>{product?.name}</h5>
            <p>{ShowPriceFormat(product?.unit_price)}</p>
            <p>Tồn: {product?.quantity}</p>
        </div>
        <button><BiDetail></BiDetail></button>
    </div>)
}