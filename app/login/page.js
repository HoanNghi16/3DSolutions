import './login.css'
import LoginHeader from '../components/login/loginHeader'
import Form from '../components/login/Form'
import { Suspense } from 'react'
export default async function login(){
    return (
        <div className='loginContainer'>
            <LoginHeader className='loginHeader'></LoginHeader>
            <Suspense Suspense={<>Loading..</>}><Form></Form></Suspense>
            <img className='loginBackground' src='https://res.cloudinary.com/dewy9gtgw/image/upload/v1766711874/loginbackground_ogwb7w.png'></img>
        </div>
    )
}
