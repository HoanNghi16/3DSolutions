"use client"
import Pagination from "./pagination"
import ProductCard from "../../components/products/productCard"
import { useState } from "react"
export default function ShowBox({products = [], services = [], totalPage, kwargs}){
    const [showProduct, setShowProduct] = useState(true)
    const message = (<span className="mess">{`Không có ${showProduct? "sản phẩm": "dịch vụ"} nào để hiển thị!`}</span>)
    const productList = (<>
                            <div className='productList'>
                                {(!products || products.length==0)? message: products.map((item) => (
                                    <ProductCard item={item} key={item.id}></ProductCard>
                                ))}
                            </div>
                            {(!products || products.length==0)?null:<Pagination page={kwargs?.page || 1} totalPage={totalPage}></Pagination>}
                        </>)
    const serviceList = (<div className="productList">
                            {(!services || services.length ==0) ? message: services.map((item) => (
                                <div key={item.id}>{item.name}</div>
                            ))}
                        </div>)
    function changeShow(e){
        if (e.target.id == "service" & showProduct){
            setShowProduct(i => !i)
        }
        else if (e.target.id == "product" & !showProduct){
            setShowProduct(i => !i)
        }
        return
    }

    return (
    <>
        <section className="productShow">
            <div className="toggle">
                <img className={`toggleMode ${showProduct?'show': null}`} id="product" onClick={changeShow} src={'/product.png'}></img>
                <img className={`toggleMode ${!showProduct?'show': null}`} id="service" onClick={changeShow} src={'/service.png'}></img>
            </div>
            <h2 className='listTitle'>Khám phá {showProduct? "sản phẩm": "dịch vụ"} của chúng tôi</h2><br></br>
            <div className="productItems">
                {showProduct? productList : serviceList}
            </div>
        </section>
    </>
    )
}