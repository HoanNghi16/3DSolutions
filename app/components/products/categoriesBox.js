"use client"
import { BiCategory, BiDownArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import { useRouter, useSearchParams} from "next/navigation"


export default function CategoriesBox({categories= null, call_time=0, inProducts=false}){
    const [openedId, setOpenedId] = useState(new Set());
    const searchParams = useSearchParams()
    const router = useRouter()
    function openList(id){
        if (openedId.has(id)){
            setOpenedId(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }else{
            setOpenedId(prev => {
                const newSet = new Set(prev);
                newSet.add(id);
                return newSet;
            });
        }
    }
    function handleCategory(id){
        const params = new URLSearchParams(searchParams)
        params.set("category", id)
        router.push(`?${params.toString()}`)
    }
    const display = (
        <ul className={`categoryList __${call_time}`} style={{paddingLeft: call_time*10 +"px", listStyleType: "none"}}>
            {categories.map((category) => (
                <li className={`cateItem ${call_time}`} key={category?.id}>
                    <div className={`cateRow _${call_time}`}>   
                        <p className="cateName" onClick={() => handleCategory (category?.id)}>{category?.name}</p>
                        {
                            (category?.children?.length > 0)? 
                            <span className="cateArrow" onClick={() => openList(category?.id)}>
                                {openedId.has(category.id)? <b>-</b>:<b>+</b>}
                            </span> : null
                        }
                        
                    </div>
                    
                    {category?.children && openedId.has(category?.id) && <CategoriesBox categories={category?.children} inProducts={inProducts} call_time={call_time+1}></CategoriesBox>}

                </li>))}
        </ul>
    )
    if (call_time === 0){
        return <div className={inProducts? "categoriesBox": "categoriesNav"}>
            {inProducts?<div className="cateBoxHeader">
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px'}}>
                    <BiCategory className="cateIcon"></BiCategory><h4 className="cateTitle">Danh mục</h4>
                </div>
                <p>Tìm kiếm sản phẩm của bạn theo danh mục</p>
            </div>: null
            }
            <div className="cateBody">
                {display}
            </div>
        </div>
    }
    return display
}