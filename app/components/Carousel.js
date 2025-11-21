'use client';
import React, {useEffect, useRef, useState} from 'react'
import './Carousel.css'

export default function Carousel({images = [], autoPlay = true, interval = 2000}){
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const length = images.length

  function goNext(){ //Chuyển tới index tiếp theo
    setIndex( (i)=>((i+1)%length))
  }
  function goPrev(){ //Chuyển tới index trước đó
    setIndex( (i) => ((i-1+length)%length))
  }

  function stopTimer(){ //Dừng đếm thời gian
    if(timerRef.current){
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
  }
  function startTimer(){ //Bắt đầu đếm thời gian
    stopTimer();
    timerRef.current = setInterval(()=> goNext(), interval);
  }
  
  useEffect(()=>{  //Chạy lại hàm khi các thành phần trên thay đổi
    if(!autoPlay || length<=1) return;
    startTimer();
    return ()=>stopTimer();
  },[autoPlay, interval, length])

  if (length === 0) return

  return (
    <div className='carousel' onMouseEnter={stopTimer} onMouseLeave={() => {if (autoPlay) startTimer();}}>
      <div className='carousel_track' style={{transform: `translateX(-${index*100}%)`}}>
          {images.map( (src, i) => { return (
            <div className='carousel_slide' key={i}>
              <img src={src} className='carousel_image'></img>
            </div>
          )})}
      </div>
      <>
          <button className='carousel_nav carousel_nav--prev' onClick={goPrev}>‹</button>
          <button className='carousel_nav carousel_nav--next' onClick={goNext}>›</button>

          <div className='carousel_indicators'>
            {images.map( (_,i) => {
              return (
                <button 
                className={`carousel_indicator ${i === index ? 'active': ''}`} 
                key={i}
                onClick={()=> setIndex(i)}></button>
              )
            })}
          </div>
      </>

    </div>
  )
}