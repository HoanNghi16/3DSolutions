"use client"
import './cards.css'
import SmallView from './SmallView'
import React, {useState, useRef} from 'react'
function Cards({cardsContent = []}){
    const isSmallView = SmallView();                //Kiểm tra nếu màn hình nhỏ hơn 1500px
    const [change, setChange] = useState(0);         //Độ biến thiên khi vuốt
    const [currentX, setCurrentX] = useState(0);     //Tọa độ X hiện tại sau khi vuốt
    const start = useRef(null);                      //Tọa độ khi bắt đầu vuốt
    const transition = useRef('none');


    //Sự kiện cho Mobile (Touch start/end/move)
    //Xử lý sự kiện chạm
    function handleTouchStart(e){
        handlePointerDown(e.touches[0])
    }
    //Xử lý sự kiện vuốt
    function handleTouchMove(e){
        if(start.current == null) return;
        const distance = e.clientX - start.current;
        if(Math.abs(distance)<5) return;
        e.preventDefault()
        setChange(distance)
    }

    //Sự kiện cho chuột (Pointer down/up/move)
    //Xử lý sự kiện nhấn xuống
    function handlePointerDown(e){
        if(e.button != 0|| !isSmallView || start.current) return   //return nếu không phải click hoặc không phải giao diện Mobile
        start.current = e.clientX
        return
    }

    //Xử lý sự kiện di chuyển
    function handlePointerMove(e){
        if(start.current == null) return;
        const distance = e.clientX - start.current;
        if(Math.abs(distance)<5) return;
        e.preventDefault()
        setChange(distance)
    }
    //Xử lý sự kiện nhấc chuột lên
    function handlePointerUp(){
        transition.current = '0.5s'
        let setX = (change + currentX)
        if(setX < -200){
            setX = -300
        }else if(setX < 200){
            setX = 0
        }
        else{
            setX = 300
        }
        setCurrentX(setX)
        setChange(0)
        start.current = null
        setTimeout(() => (transition.current = 'none'), 500)
    }
    return(
        <div className="cards" style={{transform: `translateX(${currentX + change}px)`, transition: transition.current}}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerUp}>
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