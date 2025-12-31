'use client'
import {getUserInfo, postLogout} from './lib/api/handleLogin';
import React, {useState, useEffect, createContext, useContext} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    function logout(){
        setLoading(true)
        const res = postLogout();
        if(res.ok){
            setUser(null);
        }else{
            console.log("Logout failed")
        }
        setLoading(false)
    }

    async function checkLogin(){
        try{
            const res = await getUserInfo();
            console.log(res);
            if (res.ok){
                const data = await res.json();
                setUser(data)
            }else{
                setUser(null);
            }
        }
        catch(error){
            console.log(error)
            setUser(null);
        }finally{
            setLoading(false)
        }
    }

    //Tự động lấy user mỗi lần reload    
    useEffect(() => {
        checkLogin()
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser, loading, checkLogin, setLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}