import './Nav.css'
import Link from 'next/link';
export default function Header() {
    return(
        <header>
            <Link href='/'>
                <img className='logo' src="/logoNgang2.jpg" alt='logo' loading="eager"/>
            </Link>
        </header>
    );
}