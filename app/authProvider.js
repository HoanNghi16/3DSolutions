'use client'
import {createContext, useContext, useState} from 'react'

const AuthContext = createContext(null);

export function AuthProvider({children, thisUser}) {
    const [user, setUser] = useState(thisUser)
    const [loading, setLoading] = useState(true)
    
    async function logout(){
        const res = await fetch('app/api/auth/logout/', {
            method: "POST",
            credentials: 'include'
        })
        if (res.ok){
            console.log(res.json())
            return res.json()
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