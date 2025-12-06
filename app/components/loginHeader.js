"use client"
import navData from "../data/navData"
import Link from 'next/link'
import React, {useState, useEffect, useRef} from 'react'
import SmallView from './SmallView'
import './loginHeader.css'
export default function LoginHeader(){
    const isSmall = SmallView(1000)
    const dimen = isSmall? 'X' : 'Y'
    const [transform, setTransform] = useState(`translate${dimen}(-200%)`)
    const [isHidden, setIsHidden] = useState(true)
    const color = useRef('#b1d4e0')

    function onHidden(){
        setIsHidden(!isHidden)
    }
    useEffect(()=>{
        if(isHidden){
            setTransform(`translate${dimen}(-200%)`)
            color.current= '#b1d4e0'
        }
        else{
            setTransform('none')
            color.current = 'white'
        }
    }, [isHidden, isSmall])
    return (
        <div className="loginHeader">
            <div className="loginHamburger" onClick={onHidden}><label style={{color:color.current}}>&#9776;</label></div>
            <ul className="loginMenu" style={{transform: transform, transition: '0.5s ease'}}>
                {navData
                .filter((e) => {if (e.title[0] != 'Chính sách' && e.title[0] != 'Giải pháp') return e})
                .map((item,i) => (
                    <li className="loginItem" key={i}><Link style={{color:color.current}} href={item.link} className="loginLink">{item.title[1]}</Link></li>
                ))}
            </ul>
        </div>
    )
}