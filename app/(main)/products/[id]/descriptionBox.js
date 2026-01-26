import { ShowPriceFormat } from "../../../lib/handleTextShow"
export default async function DescriptionBox({product}){
    return(
        <div className="descriptionBox">
            <h1 className="productName">{product?.name}</h1>
            <p className="productId">ID: {product?.id}</p>
            <h2 className="productPrice">{ShowPriceFormat(product?.unit_price)}&#8363;</h2>
        </div>
    )
}