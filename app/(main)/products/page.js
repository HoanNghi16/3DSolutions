// app/products/page.js
import './products.css'
import {getProducts} from "../../api/api"
import ProductCard from '../../components/products/productCard';

export default async function ProductsPage({searchParams}) {
  const page = Number((await searchParams)?.page ?? 1)
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const res = await getProducts(page);
  const data = await res.results
  return (
    <div className='productContainer'>
      <img src={"https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832134/Banner2_v4thv9.png"} style={{width: "100%"}}></img>
      <section className='show_products'>
        {data == "None"? message:  data.filter((item) => {if(item.quantity > 0) return item}).map((item, i) => (
          <ProductCard item={item} key={item.id}></ProductCard>
        ))}
      </section>
    </div>
  );
}
