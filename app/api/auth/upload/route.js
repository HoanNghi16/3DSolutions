import { cookies } from "next/headers"
export async function POST (request){
    try{
        const body = await request.formData()
        const api_url = process.env.API_URL + process.env.SERVICES_APPLICATION + process.env.UPLOAD
        const res = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Accept-Encoding': 'identity',
                Cookie: (await cookies()).toString()
            },
            body: body,
            credentials: 'include'
        })
        return res
    }catch{
        return Response.json({message: 'Lỗi!'}, {status: 500})
    }
    
}