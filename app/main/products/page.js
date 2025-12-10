// app/products/page.js
import './products.css'
export default async function ProductsPage() {
  const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION
  const res = await fetch(api_url)
  const data = await res.json()
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)

  return (
    <div style={{ padding: 20 }}>
      <section>
        {data == "None"? message: null}
      </section>
    </div>
  );
}
