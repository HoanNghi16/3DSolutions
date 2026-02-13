'use client'
import './Form.css'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from './loginForm'
import SignupForm from './signupForm'
import { useAuth } from '../../authProvider'

export default function Form(){
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState((searchParams.get("isLogin") == 'false'? false: true || true))  //Lưu trạng thái đăng nhập hay đăng ký
    //Giao diện đăng nhập
    const login = <LoginForm></LoginForm>
    //Giao diện đăng ký
    const signup = <SignupForm></SignupForm>
    function onLogin(){
        setIsLogin(!isLogin)
    }

    const {user} = useAuth()

    useEffect(() => {
        function deniedAccessLogin(){
            if (user){
                window.location.href = "/"
            }
        }
        return deniedAccessLogin();
    }, [])

    return (
        <div className='loginForm'>
            <div className='loginGroup'>
                <h4 onClick={isLogin?null:onLogin} className={`loginTitle ${isLogin?'active':''} left`}>ĐĂNG NHẬP</h4>
                <h4 onClick={isLogin?onLogin:null} className={`loginTitle ${isLogin?'':'active'} right`}>ĐĂNG KÝ</h4>
            </div>
            {isLogin? login: signup}
        </div>
    )
}