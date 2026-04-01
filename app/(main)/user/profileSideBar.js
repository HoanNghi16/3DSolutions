'use client'
import Link from 'next/link'
import { useAuth } from '../../authProvider'
import './profileSideBar.css'
import { BiSolidUserDetail, BiSolidPurchaseTag, BiCart, BiLogOut, BiLock} from 'react-icons/bi'
export default function ProfileSideBar({active}){
    const {logout} = useAuth()
    return ( <aside className="profileSidebar">
                    <h3 className="sidebarTitle">Tài khoản</h3>
                    <ul className="sidebarMenu">
                        <li className={active=="profile"?'profileActive':''}><Link style={{textDecoration:'none', color: "none"}} href='/user'><BiSolidUserDetail className="userNavIcon"></BiSolidUserDetail>  Hồ sơ</Link></li>
                        <li className={active=="order"?'profileActive':''} ><Link style={{textDecoration:'none'}} href='/user/order'><BiSolidPurchaseTag></BiSolidPurchaseTag>  Đơn hàng</Link></li>
                        <li><Link style={{textDecoration:'none'}} href="/cart"><BiCart></BiCart>  Xem giỏ hàng</Link></li>
                        <li><Link href={'/user'}><BiLock></BiLock>  Đổi mật khẩu</Link></li>
                        <li onClick={()=>logout()}><Link href={''}><BiLogOut></BiLogOut>  Đăng xuất</Link></li>
                    </ul>
                </aside>)
}