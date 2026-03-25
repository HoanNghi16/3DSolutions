import { useEffect, useState } from 'react'
import './addProductForm.css'
import { ShowPriceFormat } from '../../lib/handleTextShow'
import { fetchAdminCate, getMaterials, postNewProduct } from '../../api/api'
import { useNoti } from '../../notification'
export default function AddProductForm({open}){
    const [images, setImages] = useState([])
    const {setMessage, setType} = useNoti()
    const [cate, setCate] = useState()
    const [mate, setMate] = useState()
    const [error, setError] = useState(null)

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
            open(false)
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
                console.log(cate_)
                console.log(mate_)
            }
        }
        getOptions()
    },[])

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
                        <span className='errorForm'>{error}</span>
                        <input type='text' id='name' placeholder='Tên sản phẩm'/>
                        <select id="cate">
                            <option value={null}>Danh mục sản phẩm</option>
                            {cate && cate.map((item)=>(<option key={item?.id} value={item?.id}>{item?.name}</option>))}
                        </select>
                        <select id="mate">
                            <option value={null}>Chất liệu</option>
                            {mate && mate.map((item)=>(<option key={item?.id} value={item?.id}>{item?.name}</option>))}
                        </select>
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
                        <button disabled={error !== null} type='submit' className='submitProduct'>Thêm sản phẩm</button>
                        <button type='button' className='closeForm'>Hủy</button>
                    </form>
                </div>
            </div>
        </div>
    )
}