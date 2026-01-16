import React, {useState, useEffect} from 'react'
import validator from 'validator'
import{postLogin} from '../../api/api'
import {useAuth} from '../../authProvider'

export default function LoginForm(){
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [submitError, setSubmitError] = useState("")
    const {checkLogin} = useAuth();
    const {user} = useAuth();
    
    useEffect(() => {
        function deniedAccessLogin(){
            if (user){
                window.location.href = "/"
            }
        }
        return deniedAccessLogin();
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        const form = e.target
        const email = handleEmailChange(form.login_email)
        const password = handlePasswordChange(form.login_password)
        let success = false
        if (!email && !password){
            setSubmitError("Vui lòng nhập đầy đủ thông tin!")
            setEmailError("")
            setPasswordError("")
        }
        else if(!email || !password){
            success = false
        }
        else{
            const request = {email: email, password: password}
            const response = await postLogin(request)
            console.log(await response)
            if (response.ok){
                checkLogin()
                //await checkLogin()
                window.location.reload()
            }
            else{
                setSubmitError("Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.")
                success = false
            }
        }
        return success
    }

    function handleEmailChange(e){
        const elemet = e.target || e
        let termError = emailError
        let result = elemet.value
        setSubmitError("")
        if (result.length == 0){
            termError = "Vui lòng nhập email!"
            result = false
        }else{
            if(validator.isEmail(result)){
                termError = ""
            }else{
                termError = "Email không hợp lệ!"
                result = false
            }
        }
        setEmailError(termError)
        return result
    }
    
    function handlePasswordChange(e){
        setSubmitError("")
        const elemet = e.target || e
        let termError = passwordError
        let result = elemet.value
        if (result.length == 0){
            termError  = "Vui lòng nhập mật khẩu!"
            result = false      
        }
        else{
            termError = ""
        }
        setPasswordError(termError)
        return result
    }
    return (
            <form key={"login"} onSubmit={handleSubmit} id="login">
                <span className='error first'><b>{submitError}</b></span>
                <label className='loginLabel'><b>Email:</b></label>
                <input type='email' className='input' id='login_email' placeholder='Email' onChange={handleEmailChange}></input>
                <span id="loign_email_error" className='error'><b>{emailError}</b></span>
                <label className='loginLabel'><b>Mật khẩu:</b></label>
                <input type='password' className='input' id='login_password' placeholder='Mật khẩu' onChange={handlePasswordChange}></input>
                <span id="loign_password_error" className='error'><b>{passwordError}</b></span>
                <button className='loginButton' type='submit'><b>Đăng nhập</b></button>
            </form>
        )
}