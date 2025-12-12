// app/products/page.js
import './products.css'
import {get_products} from "../../lib/api/handle_products"

export default async function ProductsPage() {
  // const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION
  // const res = await fetch(api_url)
  // const data = await res.json()
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const data = await get_products();
  console.log(data)
  return (
    <div style={{ padding: 20 }}>
      <section>
        {data == "None"? message: typeof(data)}
      </section>
    </div>
  );
}
