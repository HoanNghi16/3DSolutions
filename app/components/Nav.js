import Link from "next/link";
import './Nav.css'
export default function Nav() {
  return (
    <nav className="menu">
        <ul className="menuitem">
            <li className="navitem"><Link className="navlink" href="/">Trang chủ</Link></li>
            <li className="navitem"><Link className="navlink" href="/products">Sản phẩm</Link></li>
            <li className="navitem"><Link className="navlink" href="/products">Giải pháp</Link></li>
            <li className="navitem"><Link className="navlink" href="/products">Liên hệ</Link></li>
            <li className="navitem"><Link className="navlink" href="/products">Chính sách</Link></li>
        </ul>
    </nav>
  );
}
