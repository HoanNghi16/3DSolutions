import Link from "next/link";
import './Nav.css'
export default function Nav() {
  return (
    <nav>
        <Link href='/'><img className="navLogo" src='/logoNgang.png'></img></Link>
        <ul className="menu">
            <li className="menuItem" id="home"><Link className="menuLink" href="/">TRANG CHỦ</Link></li>
            <li className="menuItem" id="products"><Link className="menuLink" href="/products">SẢN PHẨM</Link></li>
            <li className="menuItem"><Link className="menuLink" href="/solutions">GIẢI PHÁP</Link></li>
            <li className="menuItem"><Link className="menuLink" href="/contact">LIÊN HỆ</Link></li>
            <li className="menuItem"><Link className="menuLink" href="/products">CHÍNH SÁCH</Link></li>
        </ul>
    </nav>
  );
}
