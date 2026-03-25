import { cookies } from "next/headers"
const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.ADMIN_PRODUCT
export async function POST(payload){
    try{
        const cookieStore = await cookies()
        const body = await payload.formData()
        const res = await fetch(api_url, {
            method: 'POST',
            headers: {
                Cookie: cookieStore.toString()
            },
            body: body,
            credentials: 'include'
        })
        return res
    }
    catch(error){
        console.log(error)
        return Response.json({message: 'Lỗi!'}, {status: 500})
    }
}
export async function PUT(payload){
    try{
        const body = await payload.json()
        const res = await fetch(api_url, {
            headers: {
                "Content-Type": 'application/json',
                Cookie : (await cookies()).toString()
            },
            method: "PUT",
            body: JSON.stringify(body),
            credentials: 'include'
        })
        return res
    }catch{
        return Response.json({message: "Lỗi server!"}, {status: 500})
    }
}
