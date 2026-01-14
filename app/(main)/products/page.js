// app/products/page.js
import './products.css'
import {getProducts} from "../../api/api"
import ProductCard from '../../components/products/productCard';
import Link from 'next/link';

export default async function ProductsPage({searchParams}) {
  const page = Number((await searchParams)?.page ?? 1)
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const res = await getProducts(page);
  const data = (await res.json()).results
  return (
    <div className='productContainer'>
      <div className='productsBanner'>
        <div className='links'><Link className='link' href={'/'}>TRANG CHỦ</Link>{' / '}<Link className='link' href={'/products'}>SẢN PHẨM</Link></div> 
        <input type='search' className='searchBox' placeholder='Tìm kiếm sản phẩm'></input><br></br>
        <select className='filterBox'>
          <option default>Giá</option>
          <option>Tăng dần</option>
          <option>Giảm dần</option>
        </select>
        <select className='filterBox'>
          <option default>Chất liệu</option>
          <option>PLD</option>
          <option>PLA</option>
          <option></option>
        </select>
      </div>
      <section className='showProducts'>
        {data == "None"? message:  data.filter((item) => {if(item.quantity > 0) return item}).map((item) => (
          <ProductCard item={item} key={item.id}></ProductCard>
        ))}
      </section>
    </div>
  );
}
