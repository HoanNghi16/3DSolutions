import { ShowPriceFormat } from "../../../lib/handleTextShow"
import { BiSolidStar } from "react-icons/bi"
export default async function DescriptionBox({product}){
    const rate = product?.rate ?? 0
    const rateWidth = (rate/5)*100
    const startList = [0,1,2,3,4]
    return(
        <div className="descriptionBox">
            <h1 className="productName">{product?.name}</h1>
            <div className="rateShow">
                <div className="productRateFill" style={{width: `${rateWidth}%`}}>{startList.map((i) => <BiSolidStar key={i}></BiSolidStar>)}</div>
                <div className="productRate">{startList.map((i) => <BiSolidStar key={i}></BiSolidStar>)}</div>
            </div>
            <span className="sumaryRate">({rate}&#10025;)</span>
            
            <h2 className="productPrice">Giá: {ShowPriceFormat(product?.unit_price)}&#8363;</h2>
        </div>
    )
}