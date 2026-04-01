'use client'
import { useSearchParams, useRouter } from "next/navigation"
import AdminProductCard from "./adminProductCard"
import { BiSearch } from "react-icons/bi"
import { useState } from "react"
import AddProductForm from "./addProduct/addProductForm"
export default function AdminProductShow ({products}){
    const [openForm, setOpenForm] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleSearch = (form) =>{
        form.preventDefault()
        form = form.target
        const keyWord = form?.searchBox?.value
        const params = new URLSearchParams(searchParams)
        params.delete('page')
        params.set('keyword', keyWord)
        router.push(`?${params.toString()}`)
    }
    return (
        <section className="adminProductShow">
            {openForm? <AddProductForm open={setOpenForm}></AddProductForm>:null}
            <div className="productTable">
                <div className="productHeader">
                    <h3>Danh sách sản phẩm</h3>
                    <a href="/admin/products/addProduct" className="addProduct">Thêm sản phẩm</a>
                    <form onSubmit={(e)=>handleSearch(e)}>
                        <input id="searchBox" type="text" placeholder="Tìm kiểm sản phẩm"/>
                        <button className="searchBtn" type="submit"><BiSearch></BiSearch></button>
                    </form>
                </div>
                <div className="productBody">
                {
                    products && products.map((item)=>(
                        <AdminProductCard key={item?.id} product={item}></AdminProductCard>
                    ))
                }
                </div>
            </div>
        </section>
    )
}