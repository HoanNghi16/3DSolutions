'use client'
import {getUserInfo, postLogout, postRegister} from './lib/api/handleLogin';
import {useState, useEffect, createContext, useContext} from 'react';
import Loading from './components/loading';
import { useNoti } from './notification';


const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const {setMessage, setType} = useNoti()
    async function logout(){
        setLoading(true)
        if (user){
            const res = await postLogout();
            console.log(res)
            if(res.ok){
                setUser(null);
                checkLogin();
            }else{
                console.log("Logout failed")
            }
        }
        setLoading(false)
    }

    async function register(request){
        setLoading(true)
        try {
            const res = await postRegister(request)
            if (res.ok){
                setMessage("Đăng ký thành công")
                setType("success")
                return "Đăng ký thành công"
            }else if (res.status == 409){
                setMessage("Đăng ký thất bại")
                setType("error")
                return "Tài khoản đã tồn tại!"
            }
        }finally{
            setLoading(false)
        }
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
        <AuthContext.Provider value={{user, setUser, loading, checkLogin, setLoading, logout, register}}>
            {loading ? <Loading></Loading> : null}
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}