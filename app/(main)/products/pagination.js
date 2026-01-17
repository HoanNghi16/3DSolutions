"use client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Pagination({page, totalPage}){
    const router =  useRouter()
    const searchParams = useSearchParams()
    const listPage = Array.from({length: totalPage}, (_, numb)=> (numb+1))
    console.log("totalpage",totalPage)
    console.log(listPage)

    function changePage(e){
        console.log(e.target)
        let newPage = e.target.id
        if (newPage===page || newPage>totalPage) return page
        const params = new URLSearchParams(searchParams)
        console.log("test search params", params)
        params.set('page', newPage)
        router.push(`?page=${params.get('page')}`)
        return
    }
    return (
        <div className="pagination">
            {listPage.map((item, index)=>(
                <button className={`paginateButton ${page==item?"thisPage":""}`} id={item} key={index} onClick={changePage}>{item}</button>
            ))}
        </div>

    )
}