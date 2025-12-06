'use client'
import './loginForm.css'
import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
export default function LoginForm(){
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState(searchParams.get("login") || true)
    console.log(isLogin)
    return (
        <div className='loginForm'>
            <div className='loginGroup'>
                <h4 className={`loginTitle ${isLogin?'active':''}`}>ĐĂNG NHẬP</h4><h4 className={`loginTitle ${isLogin?'':'active'}`}>ĐĂNG KÝ</h4>
            </div>
            <label><b>Tên đăng nhập:</b></label>
            <input type='text' className='input' id='userName' placeholder='Tên đăng nhập'></input>
            <label><b>Mật khẩu:</b></label>
            <input type='password' className='input' id='passWord' placeholder='Mật khẩu'></input>
            <button className='loginButton'><b>Đăng nhập</b></button>
        </div>
    )
}