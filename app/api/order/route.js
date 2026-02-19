import { cookies } from "next/headers"
export async function POST(request){
    try{
        const body = await request.json()
        const cookieStore = await cookies()
        const access = cookieStore.get('access')
        console.log(access)
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER_CREATE
        const res = await fetch(api_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: (await cookies()).toString()
            },
            body: JSON.stringify(body), 
            credentials: 'include'
        })
        return res
    }catch{
        return Response.json({message: "Something failed"}, {status: 500})
    }
}