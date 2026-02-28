"use client"
import { useState} from "react"
import { ShowPriceFormat } from "../../../lib/handleTextShow"
import {HandleAddToCart} from "../../../lib/handleCart"
import { BiSolidStar, BiSolidLike, BiSolidCart } from "react-icons/bi"
import { HandleBuyNow } from "../../../lib/handleBuyNow"
import { useNoti } from "../../../notification"
import { useAuth } from "../../../authProvider"
export default function DescriptionBox({product}){
    const {setMessage, setType} = useNoti()
    const {setCartCount} = useAuth()
    const [quantity, setQuantity] = useState(1)
    const rate = product?.rate ?? 0
    const rateWidth = (rate/5)*100
    const startList = [0,1,2,3,4]
    const [show, setShow] = useState(false)
    function showAll(){
        return setShow(!show)
    }
    return(
        <div className="descriptionBox">
            <h1 className="productName">{product?.name} {product?.rate>4.0?<BiSolidLike className="isRecommend"></BiSolidLike> : null}</h1>
            <div className="rateBox">
                <span className="sumaryRate">{rate.toFixed(1)}</span>
                <div className="rateShow">
                    <div className="productRateFill" style={{width: `${rateWidth}%`}}>{startList.map((i) => <BiSolidStar key={i}></BiSolidStar>)}</div>
                    <div className="productRate">{startList.map((i) => <BiSolidStar key={i}></BiSolidStar>)}</div>
                </div>
                <span className="productQuantity">Số lượng còn lại: {product?.quantity}</span>
            </div>
            <p className="productPrice"><b>{ShowPriceFormat(product?.unit_price)}&#8363;</b></p>
            <div>
                <div className={!show?"description":"showAll"}>
                    <div className="descriptionHeader">
                    <h3 className="descriptionTitle">Mô tả sản phẩm</h3>
                    </div>
                    <p className="productDescription" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    <p className="productMaterial"><span className="name">Chất liệu: </span>{product?.material?.name}</p>
                </div>
                <button onClick={showAll}>{show?"Ẩn bớt":"Xem thêm"}</button>
            </div>
            <div className="addToCartBox">
                <div className="quantityBox">
                    <button onClick={() => setQuantity((i)=> {
                        if(i > 1){
                         return i - 1;
                        }else{ 
                            return 1
                        }})}>-</button>
                    <input type="number" value={quantity} onChange={
                        (e) => {
                            if (e.target.value < 1){
                                e.target.value = 1
                            }else if (e.target.value> product?.quantity){
                                e.target.value = 1
                            }else{
                                setQuantity(Number(e.target.value))
                            }
                        }
                    } />
                    <button onClick={() => setQuantity((i)=> {
                        if (i < product?.quantity){ 
                            return i + 1;
                        }else{
                            return 1}})}>+</button>
                </div>
                <button onClick={()=> {
                    HandleAddToCart(product?.id, quantity).then((res)=>{
                        setMessage(res?.message)
                        if (Number(res.cart_count)){
                            setCartCount(res.cart_count)
                            setType('success')
                        }
                        else{
                            setType('error')
                        }
                    })
                }}><BiSolidCart></BiSolidCart>Thêm vào giỏ hàng</button>
                <button onClick={()=> {
                    setMessage('Đang xác thực thông tin!')
                    HandleBuyNow('checkout', {list_ids: [product?.id], mode: 'buyNow', quantity: quantity})
                }}>Mua ngay</button>
            </div>
        </div>
    )
}