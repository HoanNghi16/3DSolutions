import { cookies } from "next/headers"
export async function POST(request){
    try{
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.PREVIEW
        const body = await request.json()
        const res = await fetch(api_url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: (await cookies()).toString(),
            },
            body: JSON.stringify(body)
        })
        if(res.status === 400){
            const term_data = await res.json()
            return Response.json({message: term_data?.message ?? "Không đủ sản phẩm!"}, {status: 400})
        }
        return res
    }catch{
        return Response.json({message: "Vui lòng chọn phẩm để có thể đặt hàng!"}, {status: 404})
    }
}