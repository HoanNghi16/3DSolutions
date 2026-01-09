import { cookies } from "next/headers"

export async function POST(){
    const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.LOGOUT
    const cookieStore = await cookies()
    const refresh = cookieStore.get("refresh")?.value
    const res = await fetch(api_url,{
        method: 'POST',
        headers: {
            'refresh': `${refresh}`,
        }
    })
    if (res.ok){
        cookieStore.delete("access")
        cookieStore.delete('refresh')
        return Response.json({message: "Logout successfully"}, {status: 200})
    }else{
        return Response.json({message: "Logout failed"}, {status: 403})
    }
}