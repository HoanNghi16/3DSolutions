import './login.css'
import LoginHeader from '../components/login/loginHeader'
import Form from '../components/login/Form'
import { Suspense } from 'react'
export default function login(){
    return (
        <div className='loginContainer'>
            <LoginHeader className='loginHeader'></LoginHeader>
            <Suspense fallback={<div>loading login...</div>}><Form></Form></Suspense>
            <img className='loginBackground' src='/loginbackground.png'></img>
        </div>
    )
}
