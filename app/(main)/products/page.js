// app/products/page.js
import './products.css'
import {getProducts} from "../../api/api"
import ProductCard from '../../components/products/productCard';

export default async function ProductsPage({searchParams}) {
  const page = Number((await searchParams)?.page ?? 1)
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const res = await getProducts(page);
  const data = (await res.json()).results
  return (
    <div className='productContainer'>
      <div className='productsBanner'>
        <p className='link'>TRANG CHỦ / SẢN PHẨM</p>
        <input type='search' className='searchBox' placeholder='Tìm kiếm sản phẩm'></input>

      </div>
      <section className='showProducts'>
        {data == "None"? message:  data.filter((item) => {if(item.quantity > 0) return item}).map((item, i) => (
          <ProductCard item={item} key={item.id}></ProductCard>
        ))}
      </section>
    </div>
  );
}
