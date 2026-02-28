'use client'
import {createContext, useContext, useState} from 'react'
import {postLogout, getMe, postSignup} from './api/api'
import { useNoti } from './notification';

const AuthContext = createContext(null);

export function AuthProvider({children, thisUser}) {
    const [user, setUser] = useState(thisUser)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsadmin] = useState(user?.is_superuser)
    const [cartCount, setCartCount] = useState(user?.cart_count)
    const {setMessage, setType} = useNoti()

    async function register(request) {
        const res = await postSignup(request)
        return res
    }

    async function checkLogin(){
        const res = await getMe()
        if (res.ok){
            setUser(res.json())
            return true
        }else{
            setUser(null)
            return false
        }
    }

    async function logout(){
        if (user){
            const res = await postLogout()
            if (res.ok){
                checkLogin()
                window.location.href='/'
                setMessage('Đăng xuất thành công')
                setType('success')
                return res.json()
            }
        }else{
            return
        }   
    }

    return (
        <AuthContext.Provider value={{user, setUser, setLoading, logout, checkLogin, register, isAdmin, cartCount, setCartCount}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}