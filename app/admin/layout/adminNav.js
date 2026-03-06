"use client"
import Link from "next/link"
import './adminNav.css'
export default function AdminNav({setOpenNav, openNav}){
    return (
        <nav className="adminNav" style={{transform: `translateX(${openNav?'0':'-90%'})`}}>
            <div className="notePiece">
                <Link title="Xem trang chủ" className="logoLink" href="/"><img alt="Xem trang chủ" className="adminLogo" src={'/onlyLogo.png'}></img>3D - Solutions</Link>
                <button className="openNavBtn" onClick={()=> {setOpenNav(e=> !e)}}>{openNav?'<':'>'}</button>
            </div>
            <ul  className="adminMenu">
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/products'}>Sản phẩm</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/users'}>Người dùng</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/payments'}>Giao dịch</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin/orders'}>Đơn hàng</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin'}>Sản phẩm</Link></li>
                <li className="adminNavItem"><Link className="adminNavLink" href={'/admin'}>Sản phẩm</Link></li>
            </ul>
        </nav>
    )
}