"use client"
import { useEffect, useState } from "react"
import { getUserCart } from "../../api/api"
import { HandleChangeCart, HandleDeleteCart } from "../../lib/handleCart"
import { ShowPriceFormat } from "../../lib/handleTextShow"
import { useAuth } from "../../authProvider"
import { useNoti } from "../../notification"

export default function CartTable(){
    const [initialized, setInitialized] = useState(false)
    const [cart, setCart] = useState(null)
    const [selected, setSelected] = useState(null)
    const [cartError, setCartError] = useState(null)
    const [total, setTotal]= useState(0)
    const {setCartCount} = useAuth()
    const {setType, setMessage} = useNoti()
    function handleQuantityChange(e,cartItem){
        if (e.target.value == ""){
            setCartError(null)
            e.target.value = e.target.defaultValue
            getTotal(selected)
            return
        }
        if (e.target.value != e.target.defaultValue){
            HandleChangeCart(cartItem?.id, cartItem?.product?.id, Number(e.target?.value)).then(result => {
                if (result?.message){
                    setCartError(result?.message)
                }else{
                    fetchCart()
                }
            })
        }else{
            setCartError(null)
            getTotal(selected)
        }
    }

    function checkQuantity(cartItem){
        return Number(cartItem?.quantity) > Number(cartItem?.product?.quantity)
    }
    function getTotal(selected){
        let term_total = 0
        if(!cart?.cart_details || !selected) return
        for (let detail of cart?.cart_details){
            if (selected.includes(detail?.id)){
                term_total+=Number(detail?.quantity*detail?.product?.unit_price)
            }
        }
        setTotal(term_total)
    }
    async function fetchCart(){
        const res = await getUserCart()
        const data = await res.json()
        if (data?.message){
            setCartError(data?.message)
            return
        }else{
            setCart(data)
            if(selected){
                getTotal(selected)
            }
            setCartError(null)
        }return true
    }
    useEffect(()=>{
        const wait = () => fetchCart()
        wait().then((res)=>{
            if(res?.message){
                setCartError(res?.message)
            }
        })
    },[])
    useEffect(()=>{
        getTotal(selected)
    },[cart])
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
            setSelected((arr) => [...arr.filter((item) => {
                if (item!= id){
                    return item
                }
            })])
        }else{
            setSelected((arr) => [...arr, id])
        }
    }

    useEffect(()=>{
        function changeStorage(){
            if (!selected){
                return
            }
            getTotal(selected)
            let checkout = {list_ids: selected, mode: 'order'}
            window.localStorage.setItem('checkout', JSON.stringify(checkout))
        }
        changeStorage()
    },[selected])

    console.log(cart)
    return (
        <div>
            <div className="cartTitle">Giỏ hàng của bạn</div>
            <table border={'true'}>
                <tbody>
                    {cart?.cart_details?.length> 0 ? cart?.cart_details?.map((cartItem)=>(
                    <tr key={cartItem.id}>
                        <td><input type="checkbox" onChange={()=>addItem(cartItem?.id)} disabled={checkQuantity(cartItem)} checked={selected?.includes(cartItem?.id) ?? true}/></td>
                        <td>{cartItem?.product.name}</td>
                        <td>
                            <input type="number" className={cartItem?.id} disabled={checkQuantity(cartItem)} defaultValue={cartItem.quantity} onBlur={(e)=>handleQuantityChange(e, cartItem)}/>
                        </td>
                        <td>{ShowPriceFormat(cartItem?.product?.unit_price)}</td>
                        <td>{ShowPriceFormat(cartItem?.sub_total)}</td>
                        <td><button type="button" onClick={()=> {
                            HandleDeleteCart(cartItem?.id,setCart).then((res)=>{
                                setMessage(res?.message)
                                if (res.cart_count != null){
                                    setCartCount(res.cart_count)
                                    setType('success')
                                }else{
                                    setType('warning')
                                }
                                
                            })
                            }}>Xóa</button></td>
                    </tr>)
                    ): null
                }
                </tbody>
            </table>
            <p>{cartError}</p>
            <p>Tổng tiền: {ShowPriceFormat(total)}</p>
            {cart?.cart_details?.length > 0? <button disabled={cartError!=null} onClick={()=>{window.location.href= '/checkout'}}>Đặt hàng</button>: null}
        </div>
    )
}
