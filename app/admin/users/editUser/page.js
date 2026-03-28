import { fetchAdminUsers } from "../../../api/api";
import UserRow from "../userRow";
import { cookies } from "next/headers";
import './editUser.css'
import EditForm from "./editForm";

export default async function EditUser({searchParams}){
    const id = (await searchParams).id ?? null
    const res_user = await fetchAdminUsers({Cookie: (await cookies()).toString()}, id)
    const user = await res_user.json() ?? null;
    return (
        <div className="editUserContainer">
            <UserRow user={user} edit={true}></UserRow>
            <EditForm defaultData={user}></EditForm>
        </div>
    )
}