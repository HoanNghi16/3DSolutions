"use client"
import Link from "next/link";
import './Nav.css'
import {navData} from '../data/navData'
import { usePathname } from "next/navigation";
export default function Nav() {
  const pathName = usePathname()
  console.log(pathName)
  return (
    <nav className="primaryNav">
        <Link href='/'><img className="navLogo" src='/logoNgang.png'></img></Link>
        <ul className="menu">
            {navData.map((item, i) => (
              <li key={i} className={`menuItem ${pathName == item?.link ? 'activeLink': ''}`}><Link className="menuLink" href={item.link}>{item.title[0].toUpperCase()}</Link></li>
            ))}
        </ul>
    </nav>
  );
}
