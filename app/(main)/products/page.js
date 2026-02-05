// app/products/page.js
import './products.css'
import {getProducts, getServices, getCategories} from "../../api/api"
import ShowBox from './showBox';
import FilterBox from './filterBox';
import CategoriesBox from '../../components/products/categoriesBox';

export default async function ProductsPage({searchParams}) {
  //tạo tham số để lọc sản phẩm và phân trang
  const kwargs = await searchParams

  //Gọi các hàm api
  const resPro = await getProducts(kwargs)
  const resSer = await getServices()
  const resCate = await getCategories()

  //Xử lý request
  const proData = await resPro.json()
  const products = (proData?.results)? proData.results : null
  const totalPage =  products? proData?.total_pages ?? 0 : 0;
  const services = await resSer.json()
  const categories = await resCate.json()

  return (
    <div className='productContainer'>
      <div className='leftBoxes'>
        <FilterBox></FilterBox>
        <CategoriesBox categories={categories?.message? null : categories} inProducts={true}></CategoriesBox>
      </div>
      <ShowBox products={products} totalPage={totalPage} services={services?.message? null : services} messContent={services?.message} kwargs={kwargs}></ShowBox>
    </div>
  );
}
