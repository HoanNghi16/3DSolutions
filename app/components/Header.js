"use client"
import './Header.css'
import Link from 'next/link';
import {useUser} from '../lib/handleUser'
import { useAuth } from '../authProvider';
export default function Header() {
    const [link1, link2] = useUser();
    const {logout, user} = useAuth()
    return(
        <header>
            <p className='headerTitle'>3D Solutions - kết nối giải pháp tới người dùng</p>
            <ul className='headerMenu'>
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' href={link1.href}><img className={user?'userIcon':'loginIcon'} src={link1.img}></img>{link1.title}</Link>
                </li>
                <li className='headerMenuItem'>
                    <Link className='headerMenuLink' onClick={logout} href={link2.href}><img className='registerIcon' src={link2.img}></img>{link2.title}</Link>
                </li>
            </ul>
        </header>
    );
}