import { cookies } from "next/headers";
export async function GET(){
    try{
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.ADMIN_CATE
        const res = await fetch(api_url,{
            method: "GET",
            headers: {
                'Accept-Encoding': 'identity',
                Cookie: (await cookies()).toString()
            }
        })
        return res
    }catch{
        return Response.json({message: "Lỗi server"},{status: 500})
    }
}