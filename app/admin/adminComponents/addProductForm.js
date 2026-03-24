import { useEffect, useState } from 'react'
import './addProductForm.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'
import { postNewProduct } from '../../api/api'
import { useNoti } from '../../notification'
export default function AddProductForm({open}){
    const [images, setImages] = useState([])
    const {setMessage, setType} = useNoti()

    const handleAddProduct = (form)=>{
        form.preventDefault()
        setMessage("Đang xử lý...")
        form.preventDefault()
        form = form.target
        const formData = new FormData()
        formData.append('name', form.name.value)
        formData.append('price', form.price.value.replaceAll('.',''))
        formData.append('quantity', form.quantity.value)
        formData.append('description', form.description.value)
        for (let image of form.images.files){
            formData.append('images[]', image)
        }
        console.log(form)
        postNewProduct(formData)
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
                    <form onSubmit={(e)=>handleAddProduct(e)} encType='multipart/form-data'>
                        <input type='text' id='name' placeholder='Tên sản phẩm'/>
                        <input type='text' id='price' placeholder='Giá sản phẩm' onFocus={(e)=>{
                            const thisprice = e.target.value.replaceAll('.','')
                            e.target.value = thisprice
                        }} onBlur={(e)=>{
                            e.target.value = ShowPriceFormat(e.target.value)
                        }}/>
                        <input type='number' id='quantity' placeholder='Số lượng nhập kho'></input>
                        <textarea id='description' onSelectCapture={(e)=>{
                            console.log(window.getSelection().toString())
                        }} onChange={(e)=>{
                            console.log(e.target.selectionDirection)
                        }}></textarea>
                            <div className='previewImageBox'>
                                {
                                images?.length > 0 && images.map((item)=>(
                                    <img className='productImagePreview' key={item?.name} src={URL.createObjectURL(item)}></img>
                                ))
                                }
                            </div>
                        <input type='file' id='images' multiple onChange={(e)=>{
                            setImages(Array.from(e.target.files))
                        }} accept='image/*'></input>
                        <button type='submit' className='submitProduct'>Thêm sản phẩm</button>
                        <button type='button' className='closeForm'>Hủy</button>
                    </form>
                </div>
            </div>
        </div>
    )
}