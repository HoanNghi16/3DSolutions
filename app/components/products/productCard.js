
import './productCard.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'
import { BiCartAdd } from 'react-icons/bi'
import handleAddToCart from '../../lib/handleAddToCart'

export default function ProductCard({item}){
    function addToCart(e){
        const id = e.id
        return handleAddToCart(id)
    }
    return (
        <div  className='product_card' href={`/products/${item.id}`}>
            <a>
                <img src={item.thumbnail} className='product_thumb'></img>
                <h5 className='product_name'>{item.name}</h5>
                <p className='product_price'><b>{ShowPriceFormat(item.unit_price)}<span style={{marginTop: "10"}}>&#8363;</span></b></p>
            </a>
            <div className='product_buttons'>
                <button className='buy_now'><b>Mua ngay</b></button>
                <button className='add_to_cart' onClick={()=>addToCart(item)}>
                    <BiCartAdd className='cart_icon'></BiCartAdd>
                </button>
            </div>
        </div>)
}