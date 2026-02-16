"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getPreview } from "../../api/api"
import { useList } from "../cart/cartProvider"

export default function ListOrder(){
    const {selected} = useList()
    const params = useSearchParams()
    const [previewList, setPreviewList] = useState(null)
    const mode = params.get("mode")
    useEffect( ()=>{
        async function fetchPreview(){
            const req = { mode: mode, list_ids : (mode === "buyNow"? [params.get("product")]: selected)}
            console.log("đây là request", req)
            const res = await getPreview(req)
            const data = await res.json()
            if (data?.message){
                setPreviewList(null)
            }
            else{
                setPreviewList(data)
            }
        }
        fetchPreview()
    },
    [])
    console.log(previewList)
    return <div className="ListOrder">
        <ul>
            {previewList? previewList.map((item) => (
                <li key={item.id}>
                    {mode === "buyNow"? 
                        item?.name :item?.product?.name
                    }
                </li>
            )): "Không có sản phẩm"}
        </ul>
    </div>
}