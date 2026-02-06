import { cookies } from "next/headers";

export async function GET(){
    try{
        const cookieStore = await cookies();
        const access = cookieStore.get('access')?.value;
        if (!access){
            return Response.json({message: "Vui lòng đăng nhập để sử dụng giỏ hàng!"}, {status: 401})
        }else{
            const api_url = process.env.API_URL + process.env.CARTS_APPLICATION + process.env.CART;
            const res = await fetch(api_url, {
                method: "GET",
                headers: {
                    "Authorization": `${access}`
                }
            })
            return res
        }
    }catch{
        return Response.json({message: "Đã có lỗi xảy ra, vui lòng thử lại sau!"}, {status: 500})
    }
}

export async function POST(request){
    try{
        const body = await request.json()
        const cookieStore = await cookies()
        const access = cookieStore.get("access")?.value
        if (!access){
            return Response.json({message: "Vui lòng đăng nhập để sử dụng giỏ hàng"}, {status: 401})
        }
        const api_url =  process.env.API_URL + process.env.CARTS_APPLICATION + process.env.ADD_TO_CART
        const res = await fetch(api_url,{
            method: "POST",
            headers:{
                "Authorization": `${access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return res
    }catch{
        return Response.json({message: "Đã xảy ra lỗi, vui lòng thử lại!"}, {status: 500})
    }
}
