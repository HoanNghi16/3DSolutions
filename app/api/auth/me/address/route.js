import { cookies } from "next/headers"

export async function POST(request){
    try{
        const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.ADDRESS
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