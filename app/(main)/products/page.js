// app/products/page.js
import './products.css'
import {getProducts, getMaterials, getServices} from "../../api/api"
import ShowBox from './showBox';
import FilterBox from './filterBox';

export default async function ProductsPage({searchParams}) {
  //tạo tham số để lọc sản phẩm và phân trang
  const kwargs = await searchParams

  //Gọi các hàm api
  const resPro = await getProducts(kwargs)
  const resMat = await getMaterials()
  const resSer = await getServices()

  //Xử lý request
  const proData = await resPro.json()
  const products = (proData?.results)? proData.results : null
  const totalPage =  products? proData?.total_pages ?? 0 : 0
  const matList = await resMat.json()
  const services = await resSer.json()

  return (
    <div className='productContainer'>
      <FilterBox matList={matList}></FilterBox>
      <ShowBox products={products} totalPage={totalPage} services={services?.message? null : services} messContent={services?.message} kwargs={kwargs}></ShowBox>
    </div>
  );
}
