"use client"
import { useRouter, useSearchParams } from "next/navigation"

export default function FilterBox({searchParams}){
    const router = useRouter()


    function handleFilterBox(e){
        e.preventDefault()
        const form = e.target 
        
        const keyword = form.keyword.value || "None"
        const sort = form.sort.value || "None"
        const material = form.material.value || "None"

        console.log(keyword)
        console.log("sort test",sort)
        const params = new URLSearchParams(searchParams)
        console.log("test params", params)
        params.set("keyword", keyword)
        params.set("sort", sort)
        params.set("material", material)
        params.set("page", 1)
        router.push(`?${params.toString()}`)
    }

    function handleDelete(e){
        const form = e.target
        const params = new URLSearchParams(searchParams)

        form.reset();
        params.set("keyword", "None")
        params.set("sort", "None")
        params.set("material", "None")
        params.set("page", 1)
        router.push(`?${params.toString()}`)
        return
    }

    return (
    <aside className='filterBox'>
        <div className='filterBoxHeader'>
          <h4 className='filterTitle'>Bộ lọc tìm kiếm</h4>
          <p>Tìm sản phẩm phù hợp với nhu cầu của bạn.</p>
        </div>
        <form className='filterForm' onSubmit={handleFilterBox} onReset={handleDelete}>
          <label className='filterBoxLabel'><b>Tìm kiếm bằng từ khóa</b></label>
          <input id='keyword' className='filterBoxInput' placeholder='Nhập từ khóa' type='text'></input><br></br>
          <label className='filterBoxLabel'><b>Sắp xếp theo mức giá</b></label>
          <select id='sort' className='filterBoxInput'>
            <option default value={null}></option>
            <option value={'up'}>Tăng dần</option>
            <option value={'down'}>Giảm dần</option>
          </select>
          <label className='filterBoxLabel'><b>Chất liệu</b></label>
          <select id='material' className='filterBoxInput'>
            <option default value={null}></option>
            <option value={'PLA'}>PLA</option>
            <option value={'PETG'}>PETG</option>
            <option value={'ABS'}>ABS</option>
            <option value={'TPU'}>TPU</option>
          </select>
          <button className='applyButton'><b>Áp dụng</b></button>
          <button type="reset" className='cancelButton'><b>Xóa tất cả</b></button>
        </form>
    </aside>
    )
}