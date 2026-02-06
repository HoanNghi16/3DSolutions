"use client"
import { addToCart} from '../api/api'

export default async function handleAddToCart(product_id){
    const request =  {product:product_id}
    console.log(request)
    const res = await addToCart(request)
    if (res.ok){
        return "Thêm vào giỏ hàng thành công"
    }
    return "Thêm vào giỏ hàng thất bại"
}