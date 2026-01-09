'use client'
import {createContext, useContext, useState} from 'react'
import {postLogout, getMe} from './api/api'
const AuthContext = createContext(null);

export function AuthProvider({children, thisUser}) {
    const [user, setUser] = useState(thisUser)
    const [loading, setLoading] = useState(true)
    
    async function checkLogin(){
        const res = await getMe()
        if (res.ok){
            setUser(res.json().user)
        }else{
            setUser(null)
        }
    }

    async function logout(){
        if (user){
            const res = await postLogout()
            if (res.ok){
                checkLogin()
                return res.json()
            }
        }else{
            return
        }   
    }


    return (
        <AuthContext.Provider value={{user, setUser, setLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}