'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';

export default function CarouselFixed({ images = [], autoPlay = true, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const length = images.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, length, interval]);

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);
  }

  function goNext() {
    setIndex((i) => (i + 1) % length);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + length) % length);
  }

  if (length === 0) return null;

  return (
    <div className="carousel" onMouseEnter={stopTimer} onMouseLeave={() => { if (autoPlay) startTimer(); }}>
      <div className='carousel__track' style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <div className='carousel__slide' key={i}>
            <img src={src} alt={`Slide ${i + 1}`} className="carousel__image" />
          </div>
        ))}
      </div>

      {length > 1 && (
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
      )}
    </div>
  );
}
