import Image from 'next/image'
import './Nav.css'
export default function Header() {
    return(
        <header>
            <Image className='logo' src="/logoNgang2.jpg" width={100} height={100} alt='logo'/>
        </header>
    );
}