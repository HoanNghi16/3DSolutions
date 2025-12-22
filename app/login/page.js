import './login.css'
import LoginHeader from '../components/login/loginHeader'
import LoginForm from '../components/login/loginForm'
import { Suspense } from 'react'
export default function login(){
    return (
        <div className='loginContainer'>
            <LoginHeader className='loginHeader'></LoginHeader>
            <Suspense fallback={<div>loading login...</div>}><LoginForm></LoginForm></Suspense>
            <img className='loginBackground' src='/loginbackground.png'></img>
        </div>
    )
}
