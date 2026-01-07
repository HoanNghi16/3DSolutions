
import './productCard.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'

export default function ProductCard({item}){
    return (
        <a  className='product_card' href={`/detail?id=${item.id}`}>
            <img src={item.thumbnail} className='product_thumb'></img>
            <h5 className='product_name'>{item.name}</h5>
            <p className='product_price'><b>{ShowPriceFormat(item.unit_price)}<span style={{marginTop: "10"}}>&#8363;</span></b></p>
            <div className='product_buttons'>
                <button className='buy_now'><b>Mua ngay</b></button>
                <button className='add_to_cart'>
                    <img src='/cart.png' loading='lazy' className='cart_icon'></img>
                </button>
            </div>
        </a>)
}