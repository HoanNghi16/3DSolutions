
import './productCard.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'

export default function ProductCard({item}){
    return (
        <a  className='product_card' href={`/detail?id=${item.id}`}>
            <img src={item.thumbnail} className='product_thumb'></img>
            <h5 className='product_name'>{item.name}</h5>
            <p className='product_price'>{ShowPriceFormat(item.unit_price)}</p>
        </a>)
}