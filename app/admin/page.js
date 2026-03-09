import { cookies } from "next/headers"
import { fetchAdminDashboard, getMe } from "../api/api"
import { redirect } from "next/navigation"
import './adminDashboard.css'
import AdminDashboard from "./adminDashboard"
export default async function AdminPage({searchParams}){
    const cookieStore = (await cookies()).toString()
    const paramsData = await searchParams
    const res_data = await fetchAdminDashboard(paramsData, {Cookie: cookieStore})
    const dashboardData = await res_data.json()
    if(dashboardData?.message){
        redirect('/')
    }
    return (
        <AdminDashboard data={dashboardData}></AdminDashboard>
    )
}