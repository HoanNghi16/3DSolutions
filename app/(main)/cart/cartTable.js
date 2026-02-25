"use client"
import { useEffect, useState } from "react"
import { getUserCart } from "../../api/api"
import { useList } from "../listProvider"

export default function CartTable(){
    const [cart, setCart] = useState(null)
    const {selected, addItem} = useList()
    console.log('inCart',selected)
    function checkQuantity(cartItem){
        return Number(cartItem?.quantity) > Number(cartItem?.product?.quantity)
    }
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
                        <td><input type="checkbox" onChange={()=>addItem(cartItem?.id)} disabled={checkQuantity(cartItem)} checked={selected.includes(cartItem?.id)}/></td>
                        <td>{cartItem?.product.name}</td>
                        <td>{!checkQuantity(cartItem)? cartItem?.quantity: "Hết hàng"}</td>
                        <td>{cartItem?.sub_total}</td>
                        <td><button>Xóa</button></td>
                    </tr>)
                    ): 
                    <tr>
                        <td>
                            Giỏ hàng trống
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            {cart?.cart_details?.length > 0? <button onClick={()=>{window.location.href= '/checkout'}}>Đặt hàng</button>: null}
        </div>
    )
}
