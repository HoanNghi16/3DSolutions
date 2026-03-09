import { getProducts } from "../../api/api"
import AdminProductShow from "./adminProductShow"
import './adminProducts.css'
import Pagination from '../../components/products/pagination'
export default async function AdminProducts({searchParams}){
    const params = await searchParams
    const page = params?.page ?? 1
    const res = await getProducts(params)
    const data = await res.json()
    const products = data?.results
    console.log(products)
    return (
        <div className="adminProducts">
            <AdminProductShow products={products}></AdminProductShow>
            <Pagination page={page} totalPage={data?.total_pages}></Pagination>
        </div>
    )
}