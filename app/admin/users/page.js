import { cookies } from "next/headers"
import { fetchAdminUsers } from "../../api/api"
import UsersTable from "./usersTabe";
import './users.css'

export default async function UsersPage(){
    const res_users = await fetchAdminUsers({Cookie: (await cookies()).toString()})
    const users = await res_users.json() ?? null;
    console.log(users)
    return (
    <div className="usersContainer">
        <UsersTable users={users}></UsersTable>
    </div>)
}