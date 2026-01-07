"use client"
import {useState, useEffect, createContext, useContext, useRef} from 'react';

const NotiContext = createContext(null)

export function Notification({children}) {
    const [color, setColor] = useState({})
    const [type, setType] = useState(null)
    const [message, setMessage] = useState(null)
    const [isClosed, setIsClosed] = useState(true)
    const timeLife = 20000
    const timer = useRef(null)
    
    useEffect(()=> {
        function changeStyle(){
            switch (type){
                case "error":
                    setColor("#d92727")
                    break;
                case "success":
                    setColor("#209911")
                    break
                default:
                    setColor("#00579a")
            }
        }
        function changeClosed(){
            if (isClosed){
                setIsClosed(false)
            }else{
                setIsClosed(true)
            }
        }
        if(isClosed && message){
            changeClosed()
            changeStyle()
            timer.current = setTimeout(()=>setIsClosed(true, timeLife))
        }
        return () => clearTimeout(timer.current)
    }, [message])
    return (
        <NotiContext.Provider value={{setMessage, type, setType}}>
            {isClosed?null:<div style={{backgroundColor:color}}>{message}</div>}
            {children}
        </NotiContext.Provider>
    )
}

export function useNoti(){
    return useContext(NotiContext)
}