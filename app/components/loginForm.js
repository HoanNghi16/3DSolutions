'use client'
import './loginForm.css'
import React, {useState} from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginForm(){
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState((searchParams.get("isLogin") == 'false'? false: true || true))  //Lưu trạng thái đăng nhập hay đăng ký

    //Giao diện khi đăng nhập
    const login = (<><label><b>Email:</b></label>
                        <input type='email' className='input' id='userName' placeholder='Email'></input>
                        <label><b>Mật khẩu:</b></label>
                        <input type='password' className='input' id='passWord' placeholder='Mật khẩu'></input>
                        <button className='loginButton'><b>Đăng nhập</b></button>
                    </>)

    //Giao diện đăng ký
    const signup = (<>
                        <label><b>Email:</b></label>
                        <input className='input' type='email' placeholder='Email'></input>
                        <label><b>Số điện thoại:</b></label>
                        <input className='input' type='phone' placeholder='Số điện thoại'></input>
                        <label><b>Họ và tên:</b></label>
                        <input className='input' type='text' placeholder='Họ và tên'></input>
                        <label><b>Ngày sinh:</b></label>
                        <input type='date' className='input' placeholder='Ngày sinh'></input>
                        <label><b>Mật khẩu:</b></label>
                        <input className='input' type='password' placeholder='Mật khẩu'></input>
                        <label><b>Nhập lại mật khẩu:</b></label>
                        <input className='input' type='password' placeholder='Nhập lại mật khẩu'></input>
                        <button className='loginButton'><b>Đăng ký</b></button>
                    </>)
    function onLogin(){
        setIsLogin(!isLogin)
    }
    return (
        <div className='loginForm'>
            <div className='loginGroup'>
                <h4 onClick={isLogin?null:onLogin} className={`loginTitle ${isLogin?'active':''}`}>ĐĂNG NHẬP</h4><h4 onClick={isLogin?onLogin:null} className={`loginTitle ${isLogin?'':'active'}`}>ĐĂNG KÝ</h4>
            </div>
            {isLogin?login:signup}
        </div>
    )
}