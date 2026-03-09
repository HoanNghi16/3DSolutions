import { cookies } from "next/headers"
export async function POST(payload){
    const cookieStore = await cookies()
    try{
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.ADMIN_PRODUCT
        const body = (await payload).FormData()
        const res = await fetch(api_url, {
            method: 'POST',
            headers: {
                Cookie: cookieStore.toString()
            },
            body: FormData(body),
            credentials: 'include'
        })
        return res
    }
    catch{
        return Response({message: 'Lỗi!'}, {status: 500})
    }
}