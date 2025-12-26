import './Header.css'
import Link from 'next/link';
export default async function Header() {
    return(
        <header>
            <p className='headerTitle'>3D Solutions - kết nối giải pháp tới người dùng</p>
            <ul className='headerMenu'>
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' href="/login"><img className='loginIcon' src='/login.png'></img>Đăng nhập</Link>
                </li>
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' href="/login?isLogin=false"><img className='registerIcon' src='/add-user.png'></img>Đăng ký</Link>
                </li>
            </ul>
        </header>
    );
}