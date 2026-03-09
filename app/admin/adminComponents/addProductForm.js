import { useEffect, useState } from 'react'
import './addProductForm.css'
export default function AddProductForm({open}){
    const [images, setImages] = useState([])
    const handleAddProduct = (form)=>{
        form.preventDefault()
        form = form.target
    }
    useEffect(()=>{
        console.log(images)
    },[images])
    return (
        <div className='formBackground' onClick={(e)=>{
            if (e.target === e.currentTarget){
                open(false)
            }
        }}>
            <div className="addProductForm">
                <div className="formHeader">
                    <h3 className="addProductTitle">Thêm sản phẩm mới</h3>
                    <button className="btnClose" onClick={()=>{open(false)}}>x</button>
                </div>
                <div className="formBody">
                    <form onSubmit={(e)=>handleAddProduct(e)}>
                        <input type='text' placeholder='Tên sản phẩm'/>
                        <input type='text' placeholder='Giá sản phẩm'/>
                        <input type='number' placeholder='Số lượng nhập kho'></input>
                        <input type='file' multiple onChange={(e)=>{
                            setImages(Array.from(e.target.files))
                        }} accept='image/*'></input>
                    </form>
                </div>
            </div>
        </div>
    )
}