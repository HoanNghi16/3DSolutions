"use client"
import Link from "next/link"
import './adminNav.css'
export default function AdminNav({setOpenNav, openNav}){
    return (
        <nav className="adminNav" style={{width: `${180*(openNav?1: 0.1)}px`}}>
            <div className="notePiece" style={{width: `${180*(openNav?1.2: 0.2)}px`}}>
                <Link title="Xem trang chủ" className="logoLink" href="/" style={{transform: `transLateX(${openNav?'0%': '-100%'})`}}><img alt="Xem trang chủ" className="adminLogo" src={'/onlyLogo.png'}></img>3D - Solutions</Link>
                <button className="openNavBtn" onClick={()=> {setOpenNav(e=> !e)}}>{openNav?'<':'>'}</button>
            </div>
            <ul  className="adminMenu" style={{transform: `transLateX(${openNav?'0%': '-100%'})`}}>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin'}>Dashboard</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/products'}>Sản phẩm</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/users'}>Người dùng</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/orders'}>Đơn hàng</Link></li>
            </ul>
        </nav>
    )
}