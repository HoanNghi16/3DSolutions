import { cookies } from "next/headers"
const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.ADDRESS
export async function POST(request){
    try{
        const body = await request.json()
        console.log(JSON.stringify(body))
        const res = await fetch(api_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: (await cookies()).toString(),
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        return res
    }catch{
        return Response.json({message: "Add address failed"}, {status: 500})
    }
}

export async function DELETE(request){
    try{
        const payload = await request.json()
        const res = await fetch(api_url, {
            method: "DELETE",
            headers:{
                Cookie: (await cookies()).toString(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return res
    } catch{
        return Response.json({message: "Lỗi server!"}, {status: 500})
    }
}