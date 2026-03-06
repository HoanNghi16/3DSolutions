import { cookies } from "next/headers"
export async function POST(request) {
    try{
        const payload = await request.json()
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER+ process.env.ADMIN
        const res = await fetch(api_url, {
            method: "POST",
            headers:{
                Cookie: (await cookies()).toString(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    return res
    }catch{
        return Response.json({message: 'Lỗi!'}, {status: 500})
    }
}