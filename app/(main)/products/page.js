// app/products/page.js
import './products.css'
import {getProducts} from "../../api/api"
import ProductCard from '../../components/products/productCard';
import Link from 'next/link';

export default async function ProductsPage({searchParams}) {
  const page = Number((await searchParams)?.page ?? 1)
  console.log("Trang máy", page)
  const message = (<span className="mess">Không có sản phẩm nào để hiển thị.</span>)
  const res = await getProducts(page);
  const products = (await res.json())?.results ?? null
  console.log(products)
  return (
    <div className='productContainer'>
      <aside className='filterBox'>
        <div className='filterBoxHeader'>
          <h4 className='filterTitle'>Bộ lọc tìm kiếm</h4>
          <p>Tìm sản phẩm phù hợp với nhu cầu của bạn.</p>
        </div>
        <form className='filterForm'>
          <label className='filterBoxLabel'><b>Tìm kiếm bằng từ khóa</b></label>
          <input className='filterBoxInput' placeholder='Nhập từ khóa' type='text'></input><br></br>
          <label className='filterBoxLabel'><b>Sắp xếp theo mức giá</b></label>
          <select className='filterBoxInput'>
            <option default></option>
            <option value={'low'}>Tăng dần</option>
            <option value={'high'}>Giảm dần</option>
          </select>
          <label className='filterBoxLabel'><b>Chất liệu</b></label>
          <select className='filterBoxInput'>
            <option default></option>
            <option value={'PLA'}>PLA</option>
            <option value={'PETG'}>PETG</option>
            <option value={'ABS'}>ABS</option>
            <option value={'TPU'}>TPU</option>
          </select>
          <button className='applyButton'><b>Áp dụng</b></button>
          <button className='cancelButton'><b>Xóa tất cả</b></button>
        </form>
      </aside>
      <secction className="productShow">
        <h2 className='listTitle'>Khám phá sản phẩm của chúng tôi</h2><br></br>
        <div className='productList'>
          {!products? message:  products.filter((item) => {if(item.quantity > 0) return item}).map((item) => (
            <ProductCard item={item} key={item.id}></ProductCard>
          ))}
        </div>
      </secction>
    </div>
  );
}
