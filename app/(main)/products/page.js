// app/products/page.js
import './products.css'
import {getProducts} from "../../api/api"
import ProductCard from '../../components/products/productCard';
import Link from 'next/link';
import Pagination from './pagination';
import FilterBox from './filterBox';

export default async function ProductsPage({searchParams}) {
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const kwargs = await searchParams
  const res = await getProducts(kwargs);
  const data = await res.json()
  const products = data?.results ?? null
  const totalPage =  data?.total_pages ?? 0
  console.log(products)

  // Handle filterBox function


  return (
    <div className='productContainer'>
      <FilterBox></FilterBox>
      <section className="productShow">
        <h2 className='listTitle'>Khám phá sản phẩm của chúng tôi</h2><br></br>
        <div className='productList'>
          {!products? message:  products.filter((item) => {if(item.quantity > 0) return item}).map((item) => (
            <ProductCard item={item} key={item.id}></ProductCard>
          ))}
        </div>
        <Pagination page={kwargs?.page} totalPage={totalPage}></Pagination>
      </section>
    </div>
  );
}
