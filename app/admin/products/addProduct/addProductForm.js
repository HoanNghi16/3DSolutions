"use client"
import { useEffect, useState } from 'react'
import './addProductForm.css'
import { ShowPriceFormat } from '../../../lib/handleTextShow'
import { fetchAdminCate, getMaterials, postNewProduct } from '../../../api/api'
import { useNoti } from '../../../notification'
import { redirect } from 'next/navigation'
export default function AddProductForm(){
    const [images, setImages] = useState([])
    const {setMessage, setType} = useNoti()
    const [cate, setCate] = useState()
    const [mate, setMate] = useState()

    const handleAddProduct = async (form)=>{
        form.preventDefault()
        setMessage("Đang xử lý...")
        form.preventDefault()
        form = form.target
        const formData = new FormData()

        formData.append('name', form.name.value)
        formData.append('price', form.price.value.replaceAll('.',''))
        formData.append('quantity', form.quantity.value)
        formData.append('description', form.description.value)
        formData.append("cate", form.cate.value)
        formData.append("mate", form.mate.value)
        for (let image of form.images.files){
            formData.append('images[]', image)
        }
        const res = await postNewProduct(formData)
        const result = await res.json()
        setMessage(result.message)
        if (res.ok){
            setType("success")
        }else{
            setType('warning')
        }
    }
    
    useEffect(()=>{
        async function getOptions(){
            const res_cate = await fetchAdminCate();
            const res_mate = await getMaterials();
            const cate_ = await res_cate.json()
            const mate_ = await res_mate.json()
            if (cate_ && mate_){
                setCate(cate_)
                setMate(mate_)
            }
        }
        getOptions()
    },[])

    return (
        <div className='formBackground'>
            <form className='addProductForm' onSubmit={(e)=>handleAddProduct(e)} encType='multipart/form-data'>
                <div className="formCard">
                    <h3 className="addProductTitle">Thêm sản phẩm mới</h3>
                    <div className='formGrid'>
                        <div className='formGroup'>
                            <label>Tên sản phẩm</label>
                            <input type='text' id='name' placeholder='Tên sản phẩm'/>
                        </div>
                        <div className='formGroup'>
                            <label>Danh mục sản phẩm</label>
                            <select id="cate">
                                <option value={null}>Danh mục sản phẩm</option>
                                {cate && cate.map((item)=>(<option key={item?.id} value={item?.id}>{item?.name}</option>))}
                            </select>
                        </div>
                        <div className='formGroup'>
                            <label>Chất liệu</label>
                            <select id="mate">
                                <option value={null}>Chất liệu</option>
                                {mate && mate.map((item)=>(<option key={item?.id} value={item?.id}>{item?.name}</option>))}
                            </select>
                        </div>
                        <div className='formGroup'>
                            <label>Giá sản phẩm</label>
                            <input type='text' id='price' placeholder='Giá sản phẩm' onFocus={(e)=>{
                                const thisprice = e.target.value.replaceAll('.','')
                                e.target.value = thisprice
                            }} onBlur={(e)=>{
                                e.target.value = ShowPriceFormat(e.target.value)
                            }}/>
                        </div>
                        <div className='formGroup'>
                            <label>Số lượng nhập kho</label>
                            <input type='number' id='quantity' placeholder='Số lượng nhập kho'></input>
                        </div>
                        <div className='formGroup'>
                            <label>Mô tả sản phẩm</label>
                            <textarea rows={5} id='description' onSelectCapture={(e)=>{
                                console.log(window.getSelection().toString())
                            }} onChange={(e)=>{
                                console.log(e.target.selectionDirection)
                            }}></textarea>
                        </div>
                        <div className='formGroup'>
                            <label>Ảnh sản phẩm</label>
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
                        </div>
                    </div>
                        <div className='formActions'>
                            <button type='submit' className='saveBtn'>Thêm sản phẩm</button>
                            <button type='button' className='cancelBtn' onClick={()=>{
                                redirect('/admin/products')
                            }}>Hủy</button>
                        </div>
                </div>
            </form>
        </div>
    )
}