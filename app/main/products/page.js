// app/products/page.js
import './products.css'
import {getProducts} from "../../lib/api/handleProducts"
import ProductCard from '../../components/products/productCard';

export default async function ProductsPage() {
  // const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION
  // const res = await fetch(api_url)
  // const data = await res.json()
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const term = await getProducts(1);
  const data = term[1];
  console.log(data)
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
