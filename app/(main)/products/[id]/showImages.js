"use client"
import { useEffect, useState } from "react"
export default function ShowImages({images=[], soldOut = false}){
    const [index, setIndex] = useState(0) 
    const length = images.length
    const [current, setCurrent] = useState(images[index])

    function nextImage(){
        return setIndex((i) => (i+1)%length)
    }
    function prevImage(){
        return setIndex((i) => (i-1 + length)%length)
    }
    function changeIndex(e){
        const i = e.target.id
        setIndex(i)
    }

    useEffect(()=>{
        function changeImage(img){
            if (img){
                setCurrent(img)
            }
            return
        }
        const image = images[index]
        return changeImage(image)
    }, [index])


    return (
        <div className="imageBox">
            <div className='imageView'>
                <img className={`currentShow ${soldOut?"soldOut":""}`} src={current?.path}></img>
                {soldOut ? <div className="soldDisplay">HẾT HÀNG</div>: null}
            </div>
            <div className="imageList">
                {images.map((item, i) => (
                    <img className={`imagePreview ${i == index? 'onShow' : ''} ${soldOut?"soldOut":""}`} onMouseEnter={changeIndex} key={item?.fileID} src={item?.path} id={i}>
                    </img>
                ))}
            </div>
        </div>
    )
}