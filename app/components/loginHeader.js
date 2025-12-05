"use client"
import navData from "../data/navData"
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import SmallView from './SmallView'
export default function LoginHeader(){
    const isSmall = SmallView(1000)
    const dimen = isSmall? 'X' : 'Y'
    const [transform, setTransform] = useState(`translate${dimen}(-200%)`)
    const [isHidden, setIsHidden] = useState(true)
    function onHidden(){
        setIsHidden(!isHidden)
    }
    useEffect(()=>{
        if(isHidden){
            setTransform(`translate${dimen}(-200%)`)
        }
        else{
            setTransform('none')
        }
    }, [isHidden, isSmall])
    return (
        <div className="loginHeader">
            <div className="loginHamburger" onClick={onHidden}><label>&#9776;</label></div>
            <ul className="loginMenu" style={{transform: transform, transition: '0.5s ease'}}>
                {navData.map((item, i) => (
                    <li className="loginItem" key={i}><Link href={item.link} className="loginLink">{item.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}