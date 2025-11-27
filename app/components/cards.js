"use client"
import './cards.css'
import SmallView from './SmallView'
import React, {useState, useRef} from 'react'
function Cards({cardsContent = []}){
    const isSmallView = SmallView();                  //Kiểm tra nếu màn hình nhỏ hơn 1500px
    const [change, setChange] = useState(0)         //Độ biến thiên khi vuốt
    const [currentX, setCurrentX] = useState(0)     //Tọa độ X hiện tại sau khi vuốt
    const start = useRef(null)                      //Tọa độ khi bắt đầu vuốt

    //Xử lý sự kiện nhấn xuống
    function handlePointerDown(e){
        if(e.button != 0 || !isSmallView) return   //return nếu không phải click hoặc không phải giao diện Mobile
        else{
            start.current = e.clientX;
        }
        return
    }
    //Xử lý sự kiện di chuyển
    function handlePointerMove(e){
        if(start.current == null) return;
        const distance = e.clientX - start.current;
        if(Math.abs(distance)<5) return;
        //set change
        setChange(distance)
    }
    //Xử lý sự kiện nhấc chuột lên
    function handlePointerUp(){
        setCurrentX(currentX + change)
        start.current = null
        setChange(0)
    }


    return(
        <div className="cards" style={{transform: `translateX(${currentX + change}px)`}}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}>
          {cardsContent.map((c,i)=> (
            <div className='card' key={i}>
                <h1 className='cardTitle'>{c.title}</h1>
                <p className='cardContent'>{c.content}</p>
            </div>
          ))}
        </div>
    )
}
export default Cards;