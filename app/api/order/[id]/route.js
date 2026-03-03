import { cookies } from "next/headers"

export async function GET (req, {params}){
    const id = (await params)?.id
    const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.ORDER + `${id}/`
    const res = await fetch(api_url, {
        method:'GET',
        headers: {
            Cookie: (await cookies()).toString()
        },
        credentials: 'include'
    })
    return res
}