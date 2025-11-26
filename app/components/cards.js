"use client"
import './cards.css'
import Mobile from './Mobile'
import React, {useState, useRef} from 'react'
function Cards({cardsContent = []}){
    const isMobileView = Mobile();
    const [change, setChange] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const start = useRef(null)
    var currentStyle = null

    function handleTouchStart(e){
        start.current = e.touches[0].clientX;
    }


    function handleTouchMove(e){
        const distance = e.touches[0].clientX - start.current
        if (Math.abs(change+currentX)>window.innerWidth + 200){
            setChange(change- distance<0? 5: -5)
            setCurrentX(currentX- distance<0? 5: -5)
            currentStyle = {transform: `translateX(${currentX + change}px)`, transition: '1s ease'}
        }
        else {setChange(distance)
            currentStyle = null}
        return
    }


    function handleTouchEnd(){
        start.current = null
        setCurrentX(currentX + change)
        setChange(0)
    }


    return(
        <div className="cards" style={currentStyle? currentStyle:{transform: `translateX(${currentX + change}px)`}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
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