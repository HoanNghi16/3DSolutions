'use client'
import './loading.css'
import React, { useEffect, useRef } from 'react'
export default function Loading(){
    const loadingStatus = ['','.', '..', '...']
    const [index, setIndex] = React.useState(0)
    const timer = useRef(null)
    useEffect(()=>{
        timer.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % loadingStatus.length)
        },400)
        return () => {
            clearInterval(timer.current)
        }
    }, [loadingStatus, index])
    return (
        <>
            <div className="loadingContainer">
                <div className='loadingWindow'>
                    <img className='loadingImage' src={'/loading.png'}></img>
                    <h3 className='loadingTitle'>Kiểm tra{loadingStatus[index]}</h3>
                </div>
            </div>
        </>
    )
}