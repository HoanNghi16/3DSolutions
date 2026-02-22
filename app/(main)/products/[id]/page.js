import { getProductDetails } from "../../../api/api"
import ShowImages from "./showImages"
import './details.css'
import Link from "next/link"
import DescriptionBox from "./descriptionBox"
export default async function DetailPage({params}){
    const id = (await params)?.id
    const res = await getProductDetails(id)
    const product = await res.json()
    return (
        <>
            <div className="detailPath">
                    <Link className="detailLink" href={'/'}>TRANG CHỦ</Link>{" > "}
                    <Link className="detailLink" href={'/products'}>SẢN PHẨM</Link>{" > "}
                    <Link className="detailLink" href={product?.detail? "/" : `/products/${product?.id}`}>{product.name?.toUpperCase() ??  "NOT FOUND"}</Link>
                </div>
            <div className={`detailContainer ${product?.detail? 'notfound': null}`}>
                {product?.detail? <span className="mess">Không tìm thấy sản phẩm.</span>:
                    <section className="detailContent">
                        <ShowImages images={product.images} soldOut={product.quantity===0}></ShowImages>
                        <DescriptionBox product={product}></DescriptionBox>
                    </section>
                }
            </div>
        </>
    )
}