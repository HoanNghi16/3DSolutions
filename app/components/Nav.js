import Link from "next/link";
import './Nav.css'
import {navData} from '../data/navData'
export default function Nav() {
  return (
    <nav>
        <Link href='/'><img className="navLogo" src='/logoNgang.png'></img></Link>
        <ul className="menu">
            {navData.map((item, i) => (
              <li key={i} className="menuItem"><Link className="menuLink" href={item.link}>{item.title[0].toUpperCase()}</Link></li>
            ))}
        </ul>
    </nav>
  );
}
