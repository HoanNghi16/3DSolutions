"use client";
import React, {useEffect, useState, useRef} from "react";
import "./status.css";
import Link from 'next/link';
import Mobile from './Mobile'

function Status({slides = [], autoPlay = true, interval = 2500}) {
    const isMobileView = Mobile()
    const [index, setIndex] = useState(0);
    const length = slides.length;
    const timerRef = useRef(null);
    const pxtrans = isMobileView? 160 : 290;
    const [change, setChange] = useState(0) //Lưu sự thay đổi giữa các vị trí khi vuốt
    const start = useRef(null);

    function handleTouchStart(e){
        stopTimer();
        start.current = e.touches[0].clientX;
    }
    function handleTouchMove(e){
        const currentChange = start.current - e.touches[0].clientX
        if (Math.abs(currentChange) < 20) return
        setChange(currentChange)
    }
    function handleTouchEnd(){
        if (change > 0){
            nextSlide()
        }
        else{
            prevSlide();
        }
        if(autoPlay)startTimer();
        setChange(0)
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{transform: `translateX(-${index*(pxtrans)}px)`}}>
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