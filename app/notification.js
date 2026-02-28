"use client"
import {useState, useEffect, createContext, useContext, useRef} from 'react';
import './notification.css'
const NotiContext = createContext(null)

export function Notification({children}) {
    // const background = {success :"#15630b", warning: "#930000",noti:  "#013a66"}
    const [type, setType] = useState(null)
    const [message, setMessage] = useState(null)
    const closeTimer = useRef(null)
    useEffect(()=>{
        if (!type || !message) return
        closeTimer.current = setTimeout(() => {
            setMessage(null)
            setType(null)
        }, 3000)
        return clearTimeout(closeTimer.current)
    },[type, message])

    return (
        <NotiContext.Provider value={{setMessage, setType}}>
            {message?<div className={`notiContainer${' '+type}`} onMouseEnter={()=> clearTimeout(closeTimer.current)} onMouseLeave={()=> {
                closeTimer.current = setTimeout(()=>{
                    setMessage(null)
                    setType(null)
                }, 3000)
            }}>
                <p className='notiMessage'>{message}</p>
                <button className='closeButton' onClick={()=>{
                    setMessage(null)
                    setType(null)
                    clearTimeout(closeTimer.current)
                }}>x</button>
            </div>: null}
            {children}
        </NotiContext.Provider>
    )
}

export function useNoti(){
    return useContext(NotiContext)
}