// app/products/page.js
import './products.css'
import {get_products} from "../../lib/api/handle_products"
import { error } from 'console';

export default async function ProductsPage() {
  // const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION
  // const res = await fetch(api_url)
  // const data = await res.json()
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const data = await get_products();
  console.log(data)
  return (
    <div style={{ padding: 20 }}>
      <section className='show_products'>
        {data == "None"? message:  data.map((item, i) => {
          return (
            <div key={i} className='product_card'>
              <p className='product_name'>{item.name}</p>
              <p className='product_price'>{item.unit_price}</p>
              <p className='product_des'>{item.description}</p>
            </div>
          )
        })}
      </section>
    </div>
  );
}
