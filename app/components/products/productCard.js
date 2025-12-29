import Link from 'next/link'
import './productCard.css'

export default function ProductCard({item}){
    return (
        <div  className='product_card'>
            <Link href={`/detail?id=${item.id}`}>
                {item.name}
            </Link>
        </div>)
}