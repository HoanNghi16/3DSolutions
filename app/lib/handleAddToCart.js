import { addToCart} from '../api/api'

export async function HandleAddToCart(product_id, quantity=1){
    const request =  {product:product_id, quantity: quantity}
    console.log(request)
    const res = await addToCart(request)
    if (res.ok){
        return "Thêm vào giỏ hàng thành công"
    }
    return "Thêm vào giỏ hàng thất bại"
}