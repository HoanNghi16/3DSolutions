import { cookies } from "next/headers"
export async function POST(request){
    try{
        const body = await request.json()
        console.log(body)
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

export async function GET(req){
    try{
        const cookieStore = await cookies()
        const access = cookieStore.get('access').value
        if(!access){
            throw new Error('Vui lòng đăng nhập để sử dụng chức năng này!s')
        }
        const {searchParams} = new URL(req.url)
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER + `?${searchParams.toString()}`
        const res = await fetch(api_url, {
            method: 'GET',
            headers: {
                "Authorization": access
            },
            credentials: 'include',
        })
        return res
    }catch(e){
        return Response.json({message: e.message},{status: 401})
    }
}