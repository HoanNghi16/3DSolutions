// app/products/page.js
import './products.css'
import {get_products} from "../../lib/api/handle_products"

export default async function ProductsPage() {
  // const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION
  // const res = await fetch(api_url)
  // const data = await res.json()
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const term = await get_products(1);
  const data = term[1];
  const pages = term[0]
  return (
    <div className='productContainer'>
      <img src={"https://res.cloudinary.com/dewy9gtgw/image/upload/v1764832134/Banner2_v4thv9.png"} style={{width: "100%"}}></img>
      <section className='show_products'>
        {data == "None"? message:  data.map((item, i) => {
          return (
            <div key={i} className='product_card'>{pages}
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
