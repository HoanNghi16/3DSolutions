import { cookies } from "next/headers"
export async function POST(payload){
    try{
        const cookieStore = await cookies()
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.ADMIN_PRODUCT
        const body = (await payload).formData()
        console.log(body)
        console.log(cookieStore.toString())
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

