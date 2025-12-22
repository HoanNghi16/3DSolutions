"use client"
import navData from "../../data/navData"
import Link from 'next/link'
import React, {useState} from 'react'
import './loginHeader.css'
export default function LoginHeader(){
    const [transform, setTransform] = useState(`translateX(200%)`);
    const [isHidden, setIsHidden] = useState(true);
    const [color, setColor] = useState('#b1d4e0');

    function onHidden(){
        if(!isHidden){
            setTransform(`translateX(200%)`)
            setColor('#b1d4e0')
        }
        else{
            setTransform('none')
            setColor('white')
        }
        setIsHidden(!isHidden)
    }
    return (
        <div className="loginHeader" onMouseEnter={(e) => {e.preventDefault()}}>
            <div className="loginHamburger" onClick={onHidden}><label style={{color:color}}>&#9776;</label></div>
            <ul className="loginMenu" style={{transform: transform, transition: '0.5s ease'}}>
                {navData
                .filter((e) => {if (e.title[0] != 'Chính sách' && e.title[0] != 'Giải pháp') return e})
                .map((item,i) => (
                    <li className="loginItem" key={i}><Link style={{color:color}} href={item.link} className="loginLink">{item.title[0]}</Link></li>
                ))}
            </ul>
        </div>
    )
}