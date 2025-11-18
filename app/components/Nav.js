import Link from "next/link";
import './Nav.css'
export default function Nav() {
  return (
    <nav className="menu">
        <ul className="menuitem">
            <li className="navitem"><b><Link className="navlink" href="/">Trang chủ</Link></b></li>
            <li className="navitem"><b><Link className="navlink" href="/products">Sản phẩm</Link></b></li>
            <li className="navitem"><b><Link className="navlink" href="/products">Giải pháp</Link></b></li>
            <li className="navitem"><b><Link className="navlink" href="/products">Liên hệ</Link></b></li>
            <li className="navitem"><b><Link className="navlink" href="/products">Chính sách</Link></b></li>
        </ul>
    </nav>
  );
}
