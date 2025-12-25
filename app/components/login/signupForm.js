export default function SignUpForm(){

    function handleSubmit(e){}
    return (
        <form key={"signup"} onSubmit={handleSubmit} id="signup">
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
        </form>
    )
}