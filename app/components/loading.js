'use client'
import './loading.css'
import React, { useEffect, useRef } from 'react'
export default function Loading({loading_title = "Kiểm tra"}){
    // const loadingStatus = ['','.', '..', '...']
    // const [index, setIndex] = React.useState(0)
    // const timer = useRef(null)
    // useEffect(()=>{
    //     timer.current = setInterval(() => {
    //         setIndex((prevIndex) => (prevIndex + 1) % loadingStatus.length)
    //     },500)
    //     return () => {
    //         clearInterval(timer.current)
    //     }
    // }, [loadingStatus, index])
    return (
        <>
            <div className="loadingContainer">
                <div className='loadingWindow'>
                    <div className="loader"></div>
                    <h5 className='loadingTitle'>Đang tải..</h5>
                </div>
            </div>
        </>
    )
}