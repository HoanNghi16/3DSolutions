"use client"
import './Header.css'
import Link from 'next/link';
import {useUser} from '../lib/handleUser'
import { useAuth } from '../authProvider';
import { BiLogIn,BiUserPlus, BiLogOut, BiUser , BiCart} from 'react-icons/bi';
export default function Header() {
    const [link1, link2] = useUser();
    const {logout, user, isAdmin} = useAuth()
    return(
        <header>
            <p className='headerTitle'>3D Solutions - kết nối giải pháp tới người dùng</p>
            <ul className='headerMenu'>
                {user? <li>
                    <Link className='headerMenuLink' style={{marginRight: "10px"}} href={'/cart'}><BiCart className='cartIcon'></BiCart></Link>
                </li>: null}
                {isAdmin? (<li>
                    <Link className='headerMenuLink spec' href={'/admin'}>Quản lý</Link>
                </li>): null}
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' href={link1.href}>{user? (link1?.img == 'default'?<BiUser className='userIcon'></BiUser>:<img className='userIcon' src={link1.img}></img>): <BiLogIn className='loginIcon'></BiLogIn>}{link1.title}</Link>
                </li>
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' onClick={logout} href={link2.href}>{user? <BiLogOut className='registerIcon'></BiLogOut>: <BiUserPlus className='registerIcon'></BiUserPlus>}{link2.title}</Link>
                </li>

            </ul>
        </header>
    );
}