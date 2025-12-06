import './login.css'
import LoginHeader from '../components/loginHeader'
export default function login(){
    return (
        <div className='loginContainer'>
            <LoginHeader className='loginHeader'></LoginHeader>
            <div className='loginForm'>
                <h2 className='loginTitle'>ĐĂNG NHẬP</h2>
                <label><b>Tên đăng nhập:</b></label>
                <input type='text' className='input' id='userName' placeholder='Tên đăng nhập'></input>
                <label><b>Mật khẩu:</b></label>
                <input type='password' className='input' id='passWord' placeholder='Mật khẩu'></input>
                <button className='loginButton'><b>Đăng nhập</b></button>
            </div>
            <img className='loginBackground' src='/loginbackground.png'></img>
        </div>
    )
}
