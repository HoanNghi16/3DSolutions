'use client'
import AdminHeader from "./layout/adminHeader";
import AdminNav from "./layout/adminNav";
import './adminLayout.css'
import { useState } from "react";

export default function AdminLayout({children}){
    const [openNav, setOpenNav] = useState()
    return (
        <div className="adminContainer">
            <AdminHeader left={openNav?180*1.2:180*0.3}></AdminHeader>
            <div className="adminBody">
                <AdminNav setOpenNav={setOpenNav} openNav={openNav}>
                </AdminNav>
                <div className="rightBody" style={{transform:`translateX(${openNav?'0px': -0.9*180+'px'})`, width: `calc(100% - ${openNav? '180px': 0})`}}>
                    {children}
                </div>
            </div>
        </div>
    )
}