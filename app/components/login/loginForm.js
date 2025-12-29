import React, {useState, useEffect} from 'react'
import validator from 'validator'
import{postLogin} from '../../lib/api/handleLogin'
import Loading from '../loading'
import {useAuth} from '../../authProvider'
export default function LoginForm(){
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [submitError, setSubmitError] = useState("")
    const {loading, setLoading} = useAuth();
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
        setLoading(true)
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
            if (response.status === 200){
                const data = await response.json()
                console.log(data)
                console.log("đăng nhập thành công")
                success = true
                await checkLogin()
            }
            else{
                setSubmitError("Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.")
                success = false
            }
        }
        console.log(user)
        setLoading(false)
        return success
    }

    function handleEmailChange(e){
        const elemet = e.target || e
        let termEmailError = emailError
        let result = elemet.value
        setSubmitError("")
        if (elemet.value.length == 0){
            termEmailError = "Vui lòng nhập email!"
            result = false
        }else{
            if(validator.isEmail(elemet.value)){
                termEmailError = ""
            }else{
                termEmailError = "Email sai!"
                result = false
            }
        }
        setEmailError(termEmailError)
        return result
    }
    
    function handlePasswordChange(e){
        setSubmitError("")
        const elemet = e.target || e
        let termPasswordError = passwordError
        let result = elemet.value
        if (elemet.value.length == 0){
            termPasswordError  = "Vui lòng nhập mật khẩu!"
            result = false      
        }
        else{
            termPasswordError = ""
        }
        setPasswordError(termPasswordError)
        return result
    }
    return (
        <>
            {loading?<Loading></Loading>:null}
            <form key={"login"} onSubmit={handleSubmit} id="login">
                <span className='error first'><b>{submitError}</b></span>
                <label><b>Email:</b></label>
                <input type='email' className='input' id='login_email' placeholder='Email' onChange={handleEmailChange}></input>
                <span id="loign_email_error" className='error'><b>{emailError}</b></span>
                <label><b>Mật khẩu:</b></label>
                <input type='password' className='input' id='login_password' placeholder='Mật khẩu' onChange={handlePasswordChange}></input>
                <span id="loign_password_error" className='error'><b>{passwordError}</b></span>
                <button className='loginButton' type='submit'><b>Đăng nhập</b></button>
            </form>
        </>)
}