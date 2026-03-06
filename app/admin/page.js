import { cookies } from "next/headers"
import { fetchAdminDashboard, getMe } from "../api/api"
import { redirect } from "next/navigation"
import './adminDashboard.css'
import AdminDashboard from "./adminDashboard"
export default async function AdminPage({searchParams}){
    const cookieStore = (await cookies()).toString()
    const res = await getMe({Cookie: cookieStore})
    const user = await res.json()
    if (user?.message){
        redirect('/')
    }
    else if(!user?.is_superuser){
        redirect('/')
    }
    const paramsData = await searchParams
    const res_data = await fetchAdminDashboard(paramsData, {Cookie: cookieStore})
    const dashboardData = await res_data.json()
    console.log(dashboardData)
    
    return (
        <AdminDashboard data={dashboardData}></AdminDashboard>
    )
}