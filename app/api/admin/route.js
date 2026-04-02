import { cookies } from "next/headers"
const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER+ process.env.ADMIN
export async function POST(request) {
    try{
        const payload = await request.json()
        
        const res = await fetch(api_url, {
            method: "POST",
            headers:{
                'Accept-Encoding': 'identity',
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

export async function GET(req){
    try{
        const {searchParams} = new URL(req.url)
        const res = await fetch(api_url+`?${searchParams.toString()}`, {
            method:"GET",
            headers: { 
                'Accept-Encoding': 'identity',
                Cookie: (await cookies()).toString()
            },            
        })
        return res
    }
    catch{
        return Response.json({message: "Lỗi!"}, {status: 500})
    }
}

export async function PUT(req){
    try{
        const payload = await req.json()
        const res = await fetch(api_url,{
            method: "PUT",
            headers: {
                'Accept-Encoding': 'identity',
                "Content-Type": "application/json",
                Cookie: (await cookies()).toString()
            },
            body: JSON.stringify(payload)
        })
        return res
    }catch{
        return Response.json({message: "Lỗi server"}, {status: 500})
    }
}