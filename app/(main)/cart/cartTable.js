"use client"
import { useEffect, useState } from "react"
import { getUserCart } from "../../api/api"

export default function CartTable(){
    const [cart, setCart] = useState(null)

    useEffect(()=>{
        async function fetchCart(){
            const res = await getUserCart()
            const data = await res.json()
            if (res?.message){
                return
            }else{
                setCart(data)
            }return true
        }   
        fetchCart()
    },[])
    console.log(cart)
    return (
        <div>
            <div className="cartTitle">Giỏ hàng của bạn</div>
            <table>
                <tbody>
                    {cart?.cart_details?.length> 0 ? cart?.cart_details?.map((cartItem)=>(
                    <tr key={cartItem.id}>
                        <td>{cartItem.product.name}</td>
                        <td>{cartItem.quantity}</td>
                        <td></td>
                    </tr>

                )): 
                    <tr>
                        <td>
                            Giỏ hàng trống
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}
