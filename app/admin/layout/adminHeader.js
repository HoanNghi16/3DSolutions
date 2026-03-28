import { BiBell, BiSearch, BiUserCircle } from 'react-icons/bi'
import './adminHeader.css'
export default function AdminHeader({left}){
    return (
    <header className="adminHeader" style={{paddingLeft: left}}>
        <div className="headerLeft">
                <h2 className="logo">Admin</h2>
            </div>
            <div className="headerRight">
                <div className="AdminBox">
                    <BiUserCircle className="AdminAvatar" />
                    <div className="AdminInfo">
                        <span className="Adminname">Nghi</span>
                        <span className="Adminrole">Admin</span>
                    </div>
                </div>
            </div>
    </header>
    )
}