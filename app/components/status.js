"use client";
import React, {useEffect, useState, useRef} from "react";
import "./status.css";
import Link from 'next/link';
const Mobile = () => {
    const breakpoint = 760;
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);
    return isMobile;
}
function Status({slides = [], autoPlay = true, interval = 3000}) {
    const isMobileView = Mobile()
    const [index, setIndex] = useState(0);
    const length = slides.length;
    const timerRef = useRef(null);
    const pxtrans = isMobileView? 180 : 40;
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
            <div className="slide_track"style={{transform: `translateX(-${index*(pxtrans)}${pxtrans == 40? '%': 'px'})`}}>
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