import { ShowPriceFormat } from "../../lib/handleTextShow"
import { BiDetail, BiTrash } from "react-icons/bi"
import ConfirmForm from '../../components/confirmForm'
import { useEffect, useState } from "react"
import { putProduct } from "../../api/api"
import { useNoti } from "../../notification"
export default function AdminProductCard({product}){
    const [deleteForm, setDeleteForm] = useState(false)
    const {setType, setMessage} = useNoti()
    const handleDelete = (request)=> {
        setMessage("Đang xử lý")
        const data = JSON.stringify(request)
        
        putProduct(data).then(res=>{
            if(res.ok){
                setMessage("Xóa sản phẩm thành công")
                setType("success")
                window.location.reload()
            }else{
                const response = res.json().finally(res=>res)
                console.log(response)
                setMessage(response)
                setType("warning")
            }
        })
    }

    return (
    <>
        {deleteForm && <ConfirmForm callEndFunc={setDeleteForm} 
                                    callFirstFunc={handleDelete} 
                                    kwargs={{'id': product?.id, 'disable': true}}
                                    detail={{product}} type="productDelete"></ConfirmForm>}
        <div className="adminProductCard">
            
            <img className="productThumbnail" src={product?.thumbnail}></img>
            <div className="productInfo">
                <h5>{product?.name}<span className="category"> ({product?.category?.name ?? "không có danh mục"})</span></h5>
                <p>{ShowPriceFormat(product?.unit_price)}</p>
                <p>Tồn: {product?.quantity}</p>
            </div>
            <a className="productButton" href={`/products/${product?.id}`}><BiDetail></BiDetail></a>
            <button className="trash" onClick={()=>setDeleteForm(true)}><BiTrash></BiTrash></button>
        </div>
    </>)
}