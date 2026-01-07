"use client"
import { useEffect, useState } from "react"
import { useAuth } from "../../authProvider"
export default function UserForm(){
    const {user, checkLogin} = useAuth()
    useEffect(()=> {
        if(!user){
            try{
                checkLogin()
            }catch(error){
                console.log(error)
            }
        } 
    }, [user])
    return (
    <div>
        {user? user.profile.name: "chưa có dữ liệu"}
    </div>)
}