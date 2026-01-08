import { cookies } from "next/headers"

export async function POST(){
    const api_url = process.env.API_URL + process.env.USER_APPLICATION + process.env.LOGOUT
    const cookieStore = await cookies()
    const refresh = cookieStore.get("refresh")?.value
    if (!refresh){
        return Response.json({message: "Token Not Found (404)"}, {status: 404})
    }
    const res = await fetch(api_url,{
        method: 'POST',
        headers: {
            'refresh': `${refresh}`
        }
    })
    if (res.ok){
        cookieStore.delete("access")
        return Response.json({message: "Logout successfully"}, {status: 200})
    }else{
        return Response.json({message: "Logout failed"}, {status: 403})
    }
}