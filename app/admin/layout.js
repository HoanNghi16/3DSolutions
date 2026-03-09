'use client'
import AdminHeader from "./layout/adminHeader";
import AdminNav from "./layout/adminNav";
import './adminLayout.css'
import { useEffect, useState } from "react";
import { useAuth } from "../authProvider";
import { redirect } from "next/navigation";

export default function AdminLayout({children}){
    const [openNav, setOpenNav] = useState()
    const {isAdmin} = useAuth()
    useEffect(()=>{
        if (!isAdmin){
            redirect('/')
        }
    },[isAdmin])
    return (
        <div className="adminContainer">
            <AdminHeader left={openNav?180*1.3:180*0.4}></AdminHeader>
            <div className="adminBody">
                <AdminNav setOpenNav={setOpenNav} openNav={openNav}>
                </AdminNav>
                <div className="rightBody" style={{width: (openNav? `calc(100dvw - 180px)`: `calc(100dvw - 18px)`), marginLeft: openNav?'180px': '0px'}}>
                    {children}
                </div>
            </div>
        </div>
    )
}