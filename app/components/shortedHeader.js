'use client';
import React, { useEffect, useState} from 'react';
import './shortedHeader.css'
import Link from 'next/link'
import navData from '../data/navData';


export default function ShortedHeader(){
    const [isHidden, setHidden] = useState(true);
    const [styleHidden, setStyleHidden] = useState({transform: `translateX(100%)`});
    const [background, setBackground] = useState({display: 'none'})

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
    

    useEffect( () => {  
        if (isHidden) {
            setTimeout(() => setStyleHidden( ({}) => ({display: 'none'})), 500)
        }
        return
    }, [isHidden])

    return(
        <div className='shortedContainer'>
            <header className='shortedHeader'>
                <div>
                    <Link href='/'className="shortedLogo" style={{textDecoration:'none'}}><img src='/OnlyLogo.png'></img>
                        <h2>3D Solutions</h2>
                    </Link>
                </div>
                <button className="hamburger" onClick={onHidden}>&#9776;</button>
            </header>
            <div className='hiddenNav' onClick={onHidden} style={background}>
                <ul className='hiddenList' style={styleHidden}>
                    {navData.map((item, i) => (
                        <li className='hiddenItem' key={i}>
                            <Link href={item.link} className='hiddenLink'>{item.title}</Link>
                        </li>
                    ))}
                    <li className='hiddenItem'>
                        <Link className='hiddenLink' href="/login">Đăng nhập</Link>
                    </li>
                    <li className='hiddenItem'>
                        <Link className='hiddenLink final' href="/register">Đăng ký</Link>
                    </li>
                </ul>
            </div>       
        </div>
    )
}