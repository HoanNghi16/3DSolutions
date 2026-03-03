'use client'
import { useAuth } from '../../authProvider'
import './profileSideBar.css'
import { BiSolidUserDetail, BiSolidPurchaseTag, BiCart, BiLocationPlus, BiLogOut, BiLock} from 'react-icons/bi'
export default function ProfileSideBar({active}){
    const {logout} = useAuth()
    return ( <aside className="profileSidebar">
                    <h3 className="sidebarTitle">Tài khoản</h3>
                    <ul className="sidebarMenu">
                        <a style={{textDecoration:'none'}} href='/user'><li className={active=="profile"?'active':''}><BiSolidUserDetail className="userNavIcon"></BiSolidUserDetail>  Hồ sơ</li></a>
                       <a style={{textDecoration:'none'}} href="/user/order"><li className={active=="order"?'active':''} ><BiSolidPurchaseTag></BiSolidPurchaseTag>  Đơn hàng</li></a>
                       <a style={{textDecoration:'none'}} href="/cart"><li><BiCart></BiCart>  Xem giỏ hàng</li></a>
                        <li><BiLock></BiLock>  Đổi mật khẩu</li>
                        <li onClick={()=>logout()}><BiLogOut></BiLogOut>  Đăng xuất</li>
                    </ul>
                </aside>)
}