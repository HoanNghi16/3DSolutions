import { addToCart, deleteCart, getUserCart, patchCart} from '../api/api'

export async function HandleAddToCart(product_id, quantity=1){
    const request =  {product:product_id, quantity: quantity}
    const res = await addToCart(request)
    if (res.ok){
        return "Thêm vào giỏ hàng thành công"
    }
    return "Thêm vào giỏ hàng thất bại"
}

export async function HandleDeleteCart(detail, setCart){
    if (!detail){
        return
    }
    const request = {detail}
    const res = await deleteCart(request)
    if(res.ok){
        //window.location.reload()
        const res_cart = await getUserCart()
        const new_cart = await res_cart.json()
        setCart(new_cart)
        return "Xóa giỏ hàng thành công"
    }
    return "Xóa thất bại"
}

export async function HandleChangeCart(detail,product, quantity){
    if (!Number(quantity)){
        return
    }
    const request = {detail, quantity, product}
    const res = await patchCart(request)
    const data = await res.json()
    if (data?.message){
        console.log("message nè")
        return data
    }else{
        return true
    }
}