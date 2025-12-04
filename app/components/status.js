"use client";
import React, {useEffect, useState, useRef} from "react";
import "./status.css";
import Link from 'next/link';
import SmallView from "./SmallView";

function Status({slides = [], autoPlay = true, interval = 2500}) {
    const isSmallView = SmallView(1000)
    const [index, setIndex] = useState(0);
    const length = slides.length;
    const timerRef = useRef(null);
    const pxtrans = isSmallView? 160 : 290;
    const [change, setChange] = useState(0)             //Lưu sự thay đổi giữa các vị trí khi vuốt
    const start = useRef(null);
    const [transition,setTransition] = useState('transform 0.5s ease');
    const [isDrag, setIsDrag] = useState(true)
    //Sự kiện cho máy tính (màn hình > 700px)
    //Sự kiện khi nhấn chuột
    function handleMouseDown(e){
        stopTimer();
        e.preventDefault();
        setTransition('transform 0s')
        if(start.current || e.button != 0) return
        start.current = e.clientX;
    }

    //Sự kiện di chuột khi nhấn
    function handleMouseMove(e){
        if (!start.current) return
        const currentChange = start.current - e.clientX
        if (Math.abs(currentChange)<10) {
            setIsDrag(false)
            return
        }
        setIsDrag(true)
        setChange(currentChange)
    }
    

    //Sự kiện cho điện thoại
    //Xử lý sự kiện khi chạm
    function handleTouchStart(e){
        stopTimer();
        if(start.current) return
        setTransition('transform 0s')
        start.current = e.touches[0].clientX;
    }
    //Xử lý sự kiện di chuyển Touch
    function handleTouchMove(e){
        if (!start.current) return
        e.preventDefault();
        const currentChange = start.current - e.touches[0].clientX
        setChange(currentChange)
    }
    
    //Xử lý sự kiện di duyển ngừng chạm
    function handleTouchEnd(){
        setTransition('transform 0.5s ease')
        setIndex((i) => {
            if(Math.abs(change) > pxtrans/3) i += (change>0? 1: -1)
            if (i + 1 === 0) i = length -2
            else if (i + 1 == length) i = 0
            return i
        })
        setChange(0)
        start.current = null;
        if(autoPlay) startTimer();
        setTimeout(()=>{
            setIsDrag(false)
        },500)
    }

    function nextSlide(){
        setIndex( (i) => {if (i + 2 == length) return 0; else return (i+1)%length});
    }

    function prevSlide(){
        setIndex( (i) => {if (i == 0) return length -2; else return (i-1+length)%length});
    }

    function stopTimer(){
        if(timerRef.current){ 
            clearInterval(timerRef.current);
        }
    }

    function startTimer(){
        stopTimer();
        timerRef.current = setInterval( () => {
            nextSlide();
        }, interval);
    }
    useEffect( () => {
        if(!autoPlay || length <= 1) return;
        startTimer();
        return () => stopTimer();
    },[autoPlay, interval, length])

    if (length <= 1) return null;
    return (
        <div className="slides" onMouseEnter={stopTimer} onMouseLeave={() => {if(autoPlay) startTimer();}}>
            <div className="slide_track"
                onTouchStart= {handleTouchStart}
                onTouchMove= {handleTouchMove}
                onTouchEnd= {handleTouchEnd}
                onMouseDown = {handleMouseDown}
                onMouseMove = {handleMouseMove} 
                onMouseUp = {handleTouchEnd}
                onMouseLeave= {handleTouchEnd}
                onClick = {((e) => {if (isDrag) e.preventDefault()})}
            style={{transform: `translateX(-${index*(pxtrans) + change}px)`, transition: transition}}>
                {slides.map( (slide, i) =>(
                    <div className="slide" key={i} >
                        <Link className="slideBlock" href={slide.link}>
                            <img className="slideImage" src = {slide.src}></img>
                            <p className="caption">{slide.caption.toUpperCase()}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="statusController">
                <button className="prev" onClick={prevSlide}>‹</button>
                <button className="next" onClick={nextSlide}>›</button>
            </div>
        </div>
    )
}
export default Status;