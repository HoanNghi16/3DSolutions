"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css";

export default function Carousel({ images = [] , autoPlay = true, interval = 2000}){
  const [index, setIndex] = useState(0);
  const length = images.length;
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || length <= 1) return;
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay, length]);

  function startTimer(){
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);
  }

  function stopTimer(){
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function goPrev(){
    setIndex((i) => (i - 1 + length) % length);
  }

  function goNext(){
    setIndex((i) => (i + 1) % length);
  }

  if (length === 0) return null;

  return (
    <div
      className="carousel"
      onMouseEnter={stopTimer}
      onMouseLeave={() => { if (autoPlay) startTimer(); }}
      ref={containerRef}
    >
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <div className="carousel__slide" key={i}>
            <h1 className="ca_content">Đây là chỗ ghi các thứ</h1>
          </div>
        ))}
      </div>

        <>
          <button className="carousel__nav carousel__nav--prev" onClick={goPrev} aria-label="Previous slide">‹</button>
          <button className="carousel__nav carousel__nav--next" onClick={goNext} aria-label="Next slide">›</button>

          <div className="carousel__indicators">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel__indicator ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
    </div>
  );
}
