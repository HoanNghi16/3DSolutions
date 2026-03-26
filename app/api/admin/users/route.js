import { cookies } from "next/headers";
export async function GET(){
    try{
        const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.ADMIN_USERS
        const res = await fetch(api_url, {
            headers:{
                Cookie: (await cookies()).toString(),
            },
        })
        return res
    }catch{
        return Response.json({message: "Lỗi server"}, {status: 500})
    }
}