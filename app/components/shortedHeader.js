'use client';
import React, { useEffect, useState} from 'react';
import './shortedHeader.css'
import Link from 'next/link'
export default function ShortedHeader(){
    const [isHidden, setHidden] = useState(true);
    const [styleHidden, setStyleHidden] = useState({transform: `translateX(100%)`});


    function onHidden(){ //Chuyển đổi trạng thái ẩn/hiện
        if(isHidden){
            setStyleHidden( ({}) => ({display: `block`, transform:`translateX(100%)`}))
            setTimeout( () => setStyleHidden( ({}) => ({transform: `none`})), 1)
        }
        else{
            setStyleHidden( ({}) => ({transform:`translateX(100%)`}))
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
                <div className="shortedLogo">
                    <img src='/OnlyLogo.png'></img>
                    <h2>3D Solutions</h2>
                </div>
                <button className="hamburger" onClick={onHidden}>&#9776;</button>
            </header>
            <div className='hiddenNav' style={styleHidden} onClick={(e) => {if(isHidden) onHidden()}}>
                <ul className='hiddenList'>
                    <li className="hiddenItem" id="home">
                        <Link className="hiddenLink" href="/">TRANG CHỦ</Link>
                        </li>
                    <li className="hiddenItem" id="products">
                        <Link className="hiddenLink" href="/products">SẢN PHẨM</Link>
                        </li>
                    <li className="hiddenItem">
                        <Link className="hiddenLink" href="/solutions">GIẢI PHÁP</Link>
                        </li>
                    <li className="hiddenItem">
                        <Link className="hiddenLink" href="/contact">LIÊN HỆ</Link>
                        </li>
                    <li className="hiddenItem">
                        <Link className="hiddenLink" href="/products">CHÍNH SÁCH</Link>
                        </li>
                    <li className='hiddenItem'>
                        <Link className='hiddenLink' href="/login"><img className='hiddenIcon' src='/login.png'></img>Đăng nhập</Link>
                    </li>
                    <li className='hiddenItem'>
                        <Link className='hiddenLink' href="/register"><img className='hiddenIcon' src='/add-user.png'></img>Đăng ký</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}