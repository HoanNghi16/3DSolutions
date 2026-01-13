"use client"
import { useEffect, useState } from "react"
import {useAuth} from '../authProvider'
import {ShortedName} from "../lib/handleTextShow"
export function useUser(getProfile){
    const {user, setLoading} = useAuth()
    const [link1, setLink1] = useState({title: "Đăng nhập", href: "/login", img:"/login.png"});
    const [link2, setLink2] = useState({title: "Đăng ký", href: "/login?isLogin=false", img:'/addUser.png'});
    useEffect(()=> {
        function changeUser(){
            if (user){
                setLink1({title: `${ShortedName(user.profile.name)}`, href: `/user`, img: user.avt})
                setLink2({title: "Đăng xuất", href: "", img: "/logout.png"})
            }
            else{
                setLink1({title: "Đăng nhập", href: "/login", img: "/login.png"})
                setLink2({title: "Đăng ký", href: "/login?isLogin=false", img: "/addUser.png"})
            }
        }
        try{
            setLoading(true)
            changeUser()
        }finally{
            setLoading(false)
        }
        return
    },[user])
    if (getProfile){
        return user
    }
    return [link1, link2]
}