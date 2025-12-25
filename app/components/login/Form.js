'use client'
import './Form.css'
import React, {useEffect, useRef, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from './loginForm'
import SignupForm from './signupForm'
export default function Form(){
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState((searchParams.get("isLogin") == 'false'? false: true || true))  //Lưu trạng thái đăng nhập hay đăng ký
    //Giao diện đăng ký
    const login = <LoginForm></LoginForm>
    //Giao diện đăng nhập
    const signup = <SignupForm></SignupForm>
    //Giao diện đăng ký
    
    function onLogin(){
        setIsLogin(!isLogin)
    }
    return (
        <div className='loginForm'>
            <div className='loginGroup'>
                <h4 onClick={isLogin?null:onLogin} className={`loginTitle ${isLogin?'active':''}`}>ĐĂNG NHẬP</h4>
                <h4 onClick={isLogin?onLogin:null} className={`loginTitle ${isLogin?'':'active'}`}>ĐĂNG KÝ</h4>
            </div>
            {isLogin? login: signup}
        </div>
    )
}