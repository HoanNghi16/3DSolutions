'use client';
import React, { useEffect, useState, useRef} from 'react';
import './shortedHeader.css'
import Link from 'next/link'
import {navData} from '../data/navData';
import {useUser} from '../lib/handleUser'
import { useAuth } from '../authProvider';
import { BiMenu } from 'react-icons/bi';
export default function ShortedHeader(){
    const [isHidden, setHidden] = useState(true);
    const [styleHidden, setStyleHidden] = useState({transform: `translateX(100%)`});
    const [background, setBackground] = useState({display: 'none'})
    const [link1, link2] = useUser();
    const {logout} = useAuth()
    const timer = useRef(null);
    

    function onHidden(){ //Chuyển đổi trạng thái ẩn/hiện
        if(isHidden){
            setStyleHidden( ({}) => ({display: `block`, transform:`translateX(100%)`}))
            setTimeout( () => setStyleHidden( ({}) => ({transform: `none`})), 1)
            setBackground({display: 'block'})
        }
        else{
            setStyleHidden( ({}) => ({transform:`translateX(100%)`}))
            setTimeout(() => setBackground({display: 'none'}), 300)  
        }
        setHidden( (i) => (!i))
    }
    
    useEffect(() => {

        if (isHidden) {
            timer.current = setTimeout(() => {
                setStyleHidden({ display: 'none' });
            }, 500);
        }

    return () => {
        if (timer.current) clearTimeout(timer.current);  //Cleanup Effect, tránh Effect chạy chồng nhau khi nhấn liên tục
    };
    }, [isHidden]);


    return(
        <div className='shortedContainer'>
            <header className='shortedHeader'>
                <div>
                    <Link href='/'className="shortedLogo" style={{textDecoration:'none'}}><img src='/OnlyLogo.png'></img>
                        <h2>3D Solutions</h2>
                    </Link>
                </div>
                <button className="hamburger" onClick={onHidden}><BiMenu></BiMenu></button>
            </header>
            <div className='hiddenNav' onClick={onHidden} style={background}>
                <ul className='hiddenList' style={styleHidden}>
                    {navData.map((item, i) => (
                        <li className='hiddenItem' key={i}>
                            <Link href={item.link} className='hiddenLink'>{item.title[0]}</Link>
                        </li>
                    ))}
                    <li className='hiddenItem'>
                        <Link className='hiddenLink' href={link1.href}>
                            {link1.title}
                        </Link>
                    </li>
                    <li className='hiddenItem'>
                        <Link className='hiddenLink final' onClick={logout} href={link2.href}>{link2.title}</Link>
                    </li>
                </ul>
            </div>       
        </div>
    )
}