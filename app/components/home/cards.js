"use client"
import './cards.css'
import SmallView from '../../lib/SmallView'
import React, {useState, useRef} from 'react'
function Cards({cardsContent = []}){
    const isSmallView = SmallView(768);                 //Kiểm tra nếu màn hình nhỏ hơn 1500px
    const [change, setChange] = useState(0);         //Độ biến thiên khi vuốt
    const [currentX, setCurrentX] = useState(0);     //Tọa độ X hiện tại sau khi vuốt
    const start = useRef(null);                      //Tọa độ khi bắt đầu vuốt
    const [transition, setTransition] = useState('none');               //Xác định Transition để tạo hiệu ứng khi vuốt hoặc khi ngừng vuốt
    const STEP = isSmallView?340:400                                 //Tọa độ lướt phù hợp với chiều rộng thẻ card.

    //Sự kiện cho Mobile (Touch start/end/move)
    //Xử lý sự kiện chạm
    function handleTouchStart(e){
        e.preventDefault()
        setTransition('transform 0s')
        if(start.current) return
        start.current = e.touches[0].clientX;
    }

    //Xử lý sự kiện vuốt
    function handleTouchMove(e){
        if (!start.current) return
        e.preventDefault();
        const currentChange = start.current - e.touches[0].clientX
        if(Math.abs(currentChange)< 5) {
            start.current = null
            return 
        }
        setChange(currentChange)
    }

    //Xử lý sự kiện ngừng chạm
    function handleTouchEnd(){
        if(!start.current) return
        setTransition('transform 0.5s')
        setCurrentX((i) => {
            if(Math.abs(change) >= (STEP)/5) i += change >= 0 ? -STEP : STEP
            if (i <= -400) i = -STEP
            if (i >= 400) i = STEP
            return i
        })
        setChange(0)
        start.current = null
        setTimeout(() => (setTransition('transform 0s')), 500)
    }


    //Sự kiện cho chuột (Pointer down/up/move)
    //Xử lý sự kiện nhấn xuống
    function handleMouseDown(e){
        e.preventDefault() //Tránh bôi đen nội dung khi trượt
        setTransition("transform 0s")
        if(e.button != 0 || start.current) return   //return nếu không phải click hoặc không phải giao diện Mobile
        start.current = e.clientX
        return
    }

    //Xử lý sự kiện di chuyển
    function handleMouseMove(e){
        e.preventDefault()
        if(start.current == null) return;
        const distance = start.current -e.clientX;
        if(Math.abs(distance)<10) return;
        setChange(distance)
    }
    return(
        <div className="cards" style={{transform: `translateX(${currentX - change}px)`, transition: transition}}
                onTouchStart= {handleTouchStart}
                onTouchMove= {handleTouchMove}
                onTouchEnd= {handleTouchEnd}
                onMouseDown = {handleMouseDown}
                onMouseMove = {handleMouseMove} 
                onMouseUp = {handleTouchEnd}
                onMouseLeave={handleTouchEnd}>
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