
import './productCard.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'
import { BiCartAdd } from 'react-icons/bi'

export default function ProductCard({item}){
    console.log(item.id)
    return (
        <a  className='product_card' href={`/products/${item.id}`}>
            <img src={item.thumbnail} className='product_thumb'></img>
            <h5 className='product_name'>{item.name}</h5>
            <p className='product_price'><b>{ShowPriceFormat(item.unit_price)}<span style={{marginTop: "10"}}>&#8363;</span></b></p>
            <div className='product_buttons'>
                <button className='buy_now'><b>Mua ngay</b></button>
                <button className='add_to_cart'>
                    <BiCartAdd className='cart_icon'></BiCartAdd>
                </button>
            </div>
        </a>)
}