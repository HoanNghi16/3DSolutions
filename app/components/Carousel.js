'use client';
import React, {useEffect, useRef, useState} from 'react';
import './Carousel.css'

export default function Carousel({images = [], autoPlay =  true, internal = 2000}){
  const [index, setIndex] = useState(0)
  const length = images.length
  const timerRef = useRef(null)

  function stopTimer(){
    if (timerRef.current){
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  function startTimer(){
    stopTimer();
    timerRef.current = setInterval( () => {
      setIndex((i) => ((i+1)%length))
    }, internal)
  }

  useEffect(() =>{
    if(!autoPlay || length<=1) return;
    startTimer();
    return () => stopTimer();
  }, [autoPlay, internal, index])


  function goPrev(){
    setIndex((i) => (i-1 + length)%length)
  }
  
  function goNext(){
    setIndex((i) => (i+1)%length)
  }

  if (length === 0) return
  return (
    <div className="carousel" onMouseEnter={stopTimer} onMouseLeave={()=> {if (autoPlay) startTimer()}}>
      <div className="carousel__track" style={{transform: `translateX(-${index*100}%)`}}>
          {images.map( (src, i) => (
            <div className="carousel__slide" key={i}>
              <img src={src} className="carousel__image"></img>
            </div>
          ))}
      </div>
      <>
          <button onClick={goNext}>next</button>
          <button onClick={goPrev}>previous</button>
      </>
    </div>
  )

}