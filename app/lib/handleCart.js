"use client"
import { addToCart, deleteCart, getUserCart, patchCart} from '../api/api'

export async function HandleAddToCart(product_id, quantity=1){
    const request =  {product:product_id, quantity: quantity}
    const res = await addToCart(request)
    const data = await res.json()
    return data
}

export async function HandleDeleteCart(detail, setCart){
    if (!detail){
        return {message: 'fail'}
    }
    const request = {detail}
    const res = await deleteCart(request)
    if(res.ok){
        //window.location.reload()
        const res_cart = await getUserCart()
        const new_cart = await res_cart.json()
        setCart(new_cart)
    }
    const data = await res.json()
    console.log(data.cart_count)
    return data
}

export async function HandleChangeCart(detail,product, quantity){
    if (!Number(quantity)){
        return
    }
    const request = {detail, quantity, product}
    const res = await patchCart(request)
    if(res.status == 200){
        return true
    }
    const data = await res.json()
    if (data?.message){
        console.log("message nè")
        return data
    }else{
        return true
    }
}