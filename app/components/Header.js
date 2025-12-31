"use client"
import './Header.css'
import Link from 'next/link';
import {useState, useEffect} from 'react'
import { useAuth } from '../authProvider';
import Loading from "./loading"
import {ShortedName} from "../lib/handleTextShow"
export default function Header() {
    const {user, logout} = useAuth();
    const [link1, setLink1] = useState({title: "Đăng nhập", href: "/login", img:"/login.png"});
    const [link2, setLink2] = useState({title: "Đăng ký", href: "/login?isLogin=false", img:'add-user.png'});
    const {loading,setLoading} = useAuth();

    function handleLogout(){
        if (user){
            logout()
        }else{
            return
        }
    }

    console.log(link1, link2)
    console.log(user)
    useEffect(()=> {
        function changeUser(){
            if (user){
                setLink1({title: `${ShortedName(user.profile.name)}`, href: `/user`, img: user.avt})
                setLink2({title: "Đăng xuất", href: "", img: "/logout.png"})
            }
            else{
                setLink1({title: "Đăng nhập", href: "/login", img: "/login.png"})
                setLink2({title: "Đăng ký", href: "/login?isLogin=false", img: "/add-user.png"})
            }
        }
        try{
            setLoading(true)
            changeUser()
        }finally{
            setLoading(false)
        }
        return
    },[user])

    return(
        <>
            {loading? <Loading></Loading>: null}
            <header>
                <p className='headerTitle'>3D Solutions - kết nối giải pháp tới người dùng</p>
                <ul className='headerMenu'>
                    <li className='headerMenuItem'>
                        <Link className='headerMenuLink' href={link1.href}><img className='loginIcon' src={link1.img}></img>{link1.title}</Link>
                    </li>
                    <li className='headerMenuItem'>
                        <Link className='headerMenuLink' onClick={handleLogout} href={link2.href}><img className='registerIcon' src={link2.img}></img>{link2.title}</Link>
                    </li>
                </ul>
            </header>
        </>
    );
}