
import './productCard.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'
import { BiCartAdd } from 'react-icons/bi'
import {HandleAddToCart} from '../../lib/handleCart'
import { useAuth } from '../../authProvider'
import { HandleBuyNow } from '../../lib/handleBuyNow'
import {useNoti} from'../../notification'

export default  function ProductCard({item}){
    const {setCartCount} = useAuth()
    const {setMessage, setType} = useNoti()
    return (
        <div  className='product_card'>
            <a href={`/products/${item.id}`} style={{textDecoration: "none"}}>
                <div className='thumb_view'>
                    <img src={item.thumbnail} className={`product_thumb ${Number(item.quantity)===0?'out_stock' : ''}`}></img>
                    {Number(item.quantity)===0 && <div className='sold_out'>Hết hàng</div>}
                </div>
                <h5 className='product_name'>{item.name}</h5>
                <p className='product_price'><b>{ShowPriceFormat(item.unit_price)}<span style={{marginTop: "10"}}>&#8363;</span></b></p>
            </a>
            <div className='product_buttons'>
                <button className='buy_now' onClick={()=> HandleBuyNow('checkout',{list_ids: [item?.id], mode:'buyNow', quantity: '1'})}><b>Mua ngay</b></button>
                <button className='add_to_cart' onClick={()=>HandleAddToCart(item?.id).then((res)=>{
                    setMessage(res?.message)
                    if (res?.cart_count){
                        setCartCount(Number(res.cart_count))
                        setType('success')
                    }else{
                        console.log('error nè')
                        setType('warning')
                    }
                    
                })}>
                    <BiCartAdd className='cart_icon'></BiCartAdd>
                </button>
            </div>
        </div>)
}