import { cookies } from "next/headers"
export async function POST(request){
    try{ 
        const body = await request.json()
        if (!body){
            throw new Error('Vui lòng đăng nhập để sử dụng chức năng này!')
        }
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER_CANCEL
        const res = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Cookie: (await cookies()).toString()
            },
            body: JSON.stringify(body)
        })
        return res
    }catch(e){
        return Response.json({message: e.message}, {status: 500})
    }
}