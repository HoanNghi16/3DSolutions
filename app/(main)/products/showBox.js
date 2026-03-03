"use client"
import Pagination from "./pagination"
import ProductCard from "../../components/products/productCard"
import { useState } from "react"
export default function ShowBox({products = [], totalPage, kwargs}){
    const message = (<span className="mess">{`Không có sản phẩm nào để hiển thị!`}</span>)
    const productList = (<>
                            <div className='productList'>
                                {(!products || products.length==0)? message: products.map((item) => (
                                    <ProductCard item={item} key={item.id}></ProductCard>
                                ))}
                            </div>
                            {(!products || products.length==0)?null:<Pagination page={kwargs?.page || 1} totalPage={totalPage}></Pagination>}
                        </>)

    return (
    <>
        <section className="productShow">
            <h2 className='listTitle'>Khám phá sản phẩm của chúng tôi</h2><br></br>
            <div className="productItems">
                {productList}
            </div>
        </section>
    </>
    )
}