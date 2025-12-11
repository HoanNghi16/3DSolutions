'use client'
import './loginForm.css'
import React, {useEffect, useRef, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import validator from 'validator'
import post_login from '../lib/api/handle_login'

export default function LoginForm(){
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState((searchParams.get("isLogin") == 'false'? false: true || true))  //Lưu trạng thái đăng nhập hay đăng ký
    const [loginError, setLoginError] = useState({submit: "",email: "", password: ""}) //Lỗi khi nhập sai các input trong form đăng nhập
    const [signupError, setSignupError] = useState({email: "",
                                                     phone: "", 
                                                     name: "", 
                                                     date_of_birth: "", 
                                                     password: "", repassword:""}) //Lỗi khi nhập sai trong form đăng ký
    const login_request = useRef({email: "", password: ""}) //Lưu request tạm
    const login = (<form onSubmit={handleSubmit} id="login">
                        <span className='error first'><b>{loginError.submit}</b></span>
                        <label><b>Email:</b></label>
                        <input type='email' className='input' id='login_email' placeholder='Email' onChange={handleLoginForm}></input>
                        <span id="loign_email_error" className='error'><b>{loginError['email']}</b></span>
                        <label><b>Mật khẩu:</b></label>
                        <input type='password' className='input' id='login_password' placeholder='Mật khẩu' onChange={handleLoginForm}></input>
                        <span id="loign_password_error" className='error'><b>{loginError['password']}</b></span>
                        <button className='loginButton' type='submit'><b>Đăng nhập</b></button>
                    </form>)

    //Giao diện đăng ký
    const signup = (<form onSubmit={handleSubmit} id="signup">
                        <span className='error first'><b></b></span>
                        <label><b>Email:</b></label>
                        <input className='input' type='email' id='signup_email' placeholder='Email'></input>
                        <span id='signup_email_error' className='error'><b></b></span>

                        <label><b>Số điện thoại:</b></label>
                        <input className='input' type='phone' id='signup_phone' placeholder='Số điện thoại'></input>
                        <span id='signup_phone_error' className='error'><b></b></span>

                        <label><b>Họ và tên:</b></label>
                        <input className='input' type='text' id='signup_name' placeholder='Họ và tên'></input>
                        <span id='signup_name_error' className='error'><b></b></span>

                        <label><b>Ngày sinh:</b></label>
                        <input type='date' className='input' id='signup_date_of_birth' placeholder='Ngày sinh'></input>
                        <span id='signup_date_of_birth_error' className='error'><b></b></span>

                        <label><b>Mật khẩu:</b></label>
                        <input className='input' type='password' id='signup_password' placeholder='Mật khẩu'></input>
                        <span id='signup_password_error' className='error'><b></b></span>

                        <label><b>Nhập lại mật khẩu:</b></label>
                        <input className='input' type='password' id='signup_repassword' placeholder='Nhập lại mật khẩu'></input>
                        <span id='signup_repassword_error' className='error'><b></b></span>

                        <button className='loginButton' type='submit'><b>Đăng ký</b></button>
                    </form>)
                    
    //Giao diện khi đăng nhập
    async function handleLoginForm(e){
        let term_login_error = {...loginError}
        const elemet = e.target || e
        console.log(elemet.id)
        switch(elemet.id){
            case "login_email": {
                if (elemet.value.length == 0){
                    term_login_error.email = "Vui lòng nhập email!"
                }else{
                    term_login_error.submit = ""
                    if(validator.isEmail(elemet.value)){
                        term_login_error.email = ""
                    }else{
                        term_login_error.email = "Email sai!"
                    }
                }
                break;
            }
            default:{
                if (elemet.value.length == 0){
                    term_login_error.password = "Vui lòng nhập mật khẩu!"
                }
                else{
                    term_login_error.password = ""
                    term_login_error.submit = ""
                }
            }
        }
        setLoginError(term_login_error)
    }
    async function handleSubmit(e){
        e.preventDefault();
        const term_login_error = {...loginError}
        const form = e.target
        console.log(form.id)
        if (form.id == "login"){
            let login_email = form.login_email
            let login_password = form.login_password
            if (login_email.value.length == 0 && login_password.value.length == 0){
                term_login_error.submit = "Vui lòng nhập đầy đủ thông tin!"
                term_login_error.email = ""
                term_login_error.password = ""
                setLoginError(term_login_error)
                return false
            }
            else{
                handleLoginForm(login_email)

                handleLoginForm(login_password)
            }
        }
    }
    
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