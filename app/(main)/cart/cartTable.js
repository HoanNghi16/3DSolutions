"use client"
import { useEffect, useState } from "react"
import { getUserCart } from "../../api/api"
import { HandleChangeCart, HandleDeleteCart } from "../../lib/handleCart"

export default function CartTable(){
    const [initialized, setInitialized] = useState(false)
    const [cart, setCart] = useState(null)
    const [selected, setSelected] = useState(null)
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
   
    useEffect(()=>{
        function getSelected(){
            if(cart){
                if (initialized){
                    return
                }
                setSelected(cart?.cart_details?.map((item) => {
                    if(Number(item?.product?.quantity )> 0){
                        return item?.id
                    }
                    }))
                setInitialized(true)
                let checkout = {list_ids : selected, mode: 'order'}
                window.localStorage.setItem('checkout', JSON.stringify(checkout))
            }
        }
        getSelected()
    },[cart, initialized])

    function addItem(id){
        if(selected.includes(id)){
            setSelected((arr) => (arr.filter((item) => {
                if (item!= id){
                    return item
                }
            })))
        }else{
            setSelected((arr) => [...arr, id])
        }
    }

    useEffect(()=>{
        function changeStorage(){
            if (!selected){
                return
            }
            let checkout = {list_ids: selected, mode: 'order'}
            window.localStorage.setItem('checkout', JSON.stringify(checkout))
        }
        changeStorage()
    },[selected])

    console.log(cart)
    return (
        <div>
            <div className="cartTitle">Giỏ hàng của bạn</div>
            <table>
                <tbody>
                    {cart?.cart_details?.length> 0 ? cart?.cart_details?.map((cartItem)=>(
                    <tr key={cartItem.id}>
                        <td><input type="checkbox" onChange={()=>addItem(cartItem?.id)} disabled={checkQuantity(cartItem)} checked={selected?.includes(cartItem?.id) ?? true}/></td>
                        <td>{cartItem?.product.name}</td>
                        <td>
                            <input type="number" className={cartItem?.id} disabled={checkQuantity(cartItem)} defaultValue={cartItem.quantity} onBlur={(e)=>{
                                HandleChangeCart(cartItem?.id,cartItem?.product?.id, e.target.value, setCart).then((res)=>{
                                    e.target.value = res
                                })
                            }}/>
                        </td>
                        <td>{cartItem?.sub_total}</td>
                        <td><button type="button" onClick={()=> HandleDeleteCart(cartItem?.id,setCart)}>Xóa</button></td>
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
