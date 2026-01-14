import {GET} from '../api/auth/me/route'
export default async function AdminPage(){
    const data = await GET().then(res => res.json())
    const admin = data?.message ? null : (data.user?.is_superuser? data.user: null)
    return (
    <>
        {admin? <>
            <h1>Thống kê</h1>
        </>: null}
    </>)
}