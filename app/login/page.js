import './login.css'
import LoginHeader from '../components/loginHeader'
import LoginForm from '../components/loginForm'
export default function login(){
    return (
        <div className='loginContainer'>
            <LoginHeader className='loginHeader'></LoginHeader>
            <LoginForm></LoginForm>
            <img className='loginBackground' src='/loginbackground.png'></img>
        </div>
    )
}
