import React, {useState} from 'react'
import validator from 'validator'
import{post_login} from '../../lib/api/handle_login'

export default function LoginForm(){
    const [loginError, setLoginError] = useState({submit: "",email: "", password: ""}) //Lỗi khi nhập sai các input trong form đăng nhập
    async function handleSubmit(e){
        e.preventDefault()
        const form = e.target
        const email = handleEmailChange(form.login_email)
        const password = handlePasswordChange(form.login_password)
        if(!email || !password){
            return false;
        }
    }

    function handleEmailChange(e){
        const elemet = e.target || e
        let term_login_error = {...loginError}
        let result = elemet.value
        if (elemet.value.length == 0){
            term_login_error.email = "Vui lòng nhập email!"
            result = false
        }else{
            term_login_error.submit = ""
            if(validator.isEmail(elemet.value)){
                term_login_error.email = ""
            }else{
                term_login_error.email = "Email sai!"
                result = false
            }
        }
        setLoginError(term_login_error)
        return result
    }
    
    function handlePasswordChange(e){
        const elemet = e.target || e
        let term_login_error = {...loginError}
        let result = elemet.value
        if (elemet.value.length == 0){
            term_login_error.password = "Vui lòng nhập mật khẩu!"
            result = false      
        }
        else{
            term_login_error.password = ""
        }
        setLoginError(term_login_error)
        return result
    }
    return (<form key={"login"} onSubmit={handleSubmit} id="login">
                        <span className='error first'><b>{loginError.submit}</b></span>
                        <label><b>Email:</b></label>
                        <input type='email' className='input' id='login_email' placeholder='Email' onChange={handleEmailChange}></input>
                        <span id="loign_email_error" className='error'><b>{loginError['email']}</b></span>
                        <label><b>Mật khẩu:</b></label>
                        <input type='password' className='input' id='login_password' placeholder='Mật khẩu' onChange={handlePasswordChange}></input>
                        <span id="loign_password_error" className='error'><b>{loginError['password']}</b></span>
                        <button className='loginButton' type='submit'><b>Đăng nhập</b></button>
                    </form>)
}