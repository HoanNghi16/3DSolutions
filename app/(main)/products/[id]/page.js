import { getProductDetails } from "../../../api/api"
import ShowImages from "./showImages"
import './details.css'
export default async function DetailPage({params}){
    const id = (await params)?.id
    const res = await getProductDetails(id)
    const product = await res.json()
    console.log(product)
    return (
    <div className="detailContainer">
        <ShowImages images={product.images}></ShowImages>
    </div>)
}