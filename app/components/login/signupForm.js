import {useState} from 'react'
import validator from 'validator'
import {useAuth} from '../../authProvider'
import { useNoti } from '../../notification'
export default function SignUpForm(){
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [nameError, setNameError] = useState('')
    const [dateError, setDateError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setRePasswordError] = useState('')
    const [submitError, setSubmitError] = useState('')
    const {register} = useAuth()
    const {setMessage, setType} = useNoti()


    function handleEmailChange(e){
        let email = e.target || e
        email = email.value
        let termError = emailError
        setSubmitError("")
        if (email.length == 0){
            termError = "Vui lòng nhập email!"
            email = false
        }else{
            if(validator.isEmail(email)){
                termError = ""
            }else{
                termError = "Email không hợp lệ!"
                email = false
            }
        }
        setEmailError(termError)
        return email
    }

    function handleNameChange(e){
        setSubmitError("")
        let name = e.target|| e
        name = name.value
        if (!name || name.lenght == 0){
            setNameError("Vui lòng nhập họ và tên!")
            return false
        }
        let termError = ''
        const pattern = /^[A-ZÀ-ỸĐ][a-zà-ỹđ]*\s([A-ZÀ-ỸĐ][a-zà-ỹđ]*)(\s[A-ZÀ-ỸĐ][a-zà-ỹđ]*)*$/
        if (pattern.test(name)){
            termError = ""
        }else{
            termError = "Họ tên không hợp lệ!"
            name = false
        }
        setNameError(termError)
        return name
    }

    function handlePhoneChange(e){
        setSubmitError("")
        let phone = e.target || e
        phone = phone.value
        let termError = phoneError
        let pattern = /^0{1}[3-9]{1}\d{8,9}$/
        setSubmitError('')
        if(phone.length == 0){
            termError = "Vui lòng nhập số điện thoại!"
            phone = false
        }
        else{
            if (pattern.test(phone)){
                termError = ''
            }
            else{
                termError = 'Số điện thoại không hợp lệ!'
            }
        }
        setPhoneError(termError)
        return phone
    }

    function handlePasswordChange(e){
        setSubmitError("")
        let password = e.target || e
        password = password.value
        if (!password || password.length == 0){
            setPasswordError("Vui lòng nhập mật khẩu!")
            return false      
        }
        let termError = ""
        if (password.length < 6){
            termError = "Mật khẩu yếu vui lòng đặt mật khẩu từ 6 ký tự."
            password = false
        }
        else{
            termError = ""
        }
        setPasswordError(termError)
        return password
    }

    function handleDateChange(e){
        setSubmitError("")
        let date = e.target || e
        date = date.value
        if (!date || date.length == 0){
            setDateError("Vui lòng chọn ngày sinh!")
            return false
        }
        date = new Date(date)
        let termError = ''
        const today = new Date()
        if (today.getFullYear() - date.getFullYear()< 12){
            termError = "Bạn phải đủ 12 tuổi!"
            date = false
        }else{
            termError = ""
        }
        setDateError(termError)
        if (date){
            date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
        return date
    }

    function handleRePassword(e){
        setSubmitError("")
        let repass = e.target||e
        repass = repass.value
        const password = document.getElementById("signup_password").value
        let termRePass = ''
        if (!repass || repass.length == 0){
            termRePass = "Vui lòng nhập lại mật khẩu!"
            repass = false
        }
        else if (repass != password){
            termRePass = "Mật khẩu không khóp!"
            repass = false
        }
        else{
            termRePass = ""
        }
        setRePasswordError(termRePass)
        return repass
    }

    async function handleSubmit(e){
        setSubmitError("")
        e.preventDefault()
        const form = e.target
        const email = handleEmailChange(form.signup_email)
        const phone = handlePhoneChange(form.signup_phone)
        const name = handleNameChange(form.signup_name)
        const date = handleDateChange(form.signup_date)
        const password = handlePasswordChange(form.signup_password)
        const repass = handleRePassword(form.signup_repassword)

        if (!email || !name || !date || !password || !repass || !phone)
        {
            setSubmitError("Vui lòng nhập đầy đủ thông tin!")
            form.getElementsByTagName("span").innerHTML = ""
            return false
        }else{
            setMessage('Đang xác thực thông tin!')
            const request = {email: email, name: name, date_of_birth: date, password: password, phone: phone}
            const res = await register(request)
            const data = await res.json()
            setMessage(data?.message)
            setType(res.ok?'success': 'warning')
            return true
        }
    }
    return (
        <form key={"signup"} onSubmit={handleSubmit} id="signup">
            <span className='error first'><b>{submitError}</b></span>
            <label className='loginLabel'><b>Email:</b></label>
            <input className='input' type='email' id='signup_email' onChange={handleEmailChange} placeholder='Email'></input>
            <span id='signup_email_error' className='error'><b>{emailError}</b></span>

            <label className='loginLabel'><b>Số điện thoại:</b></label>
            <input className='input' type='tel' id='signup_phone' onChange={handlePhoneChange} placeholder='Số điện thoại'></input>
            <span id='signup_phone_error' className='error'><b>{phoneError}</b></span>

            <label className='loginLabel'><b>Họ và tên:</b></label>
            <input className='input' type='text' id='signup_name' placeholder='Họ và tên' onChange={handleNameChange}></input>
            <span id='signup_name_error' className='error'><b>{nameError}</b></span>

            <label className='loginLabel'><b>Ngày sinh:</b></label>
            <input type='date' className='input' id='signup_date' placeholder='Ngày sinh' onChange={handleDateChange}></input>
            <span id='signup_date' className='error'><b>{dateError}</b></span>

            <label className='loginLabel'><b>Mật khẩu:</b></label>
            <input className='input' type='password' id='signup_password' placeholder='Mật khẩu' onChange={handlePasswordChange}></input>
            <span id='signup_password_error' className='error'><b>{passwordError}</b></span>

            <label className='loginLabel'><b>Nhập lại mật khẩu:</b></label>
            <input className='input' type='password' id='signup_repassword' placeholder='Nhập lại mật khẩu' onChange={handleRePassword}></input>
            <span id='signup_repassword_error' className='error'><b>{rePasswordError}</b></span>

            <button className='loginButton' type='submit'><b>Đăng ký</b></button>
        </form>
    )
}