import { cookies } from "next/headers";


const cart_change_url = process.env.API_URL + process.env.CARTS_APPLICATION + process.env.CART_CHANGE


export async function GET(){
    try{
        const cookieStore = await cookies()
        const access = cookieStore.get("access")?.value
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
        const cookieStore = await cookies()
        const access = cookieStore.get("access")?.value
        const body = await request.json()
        if (!access){
            return Response.json({message: "Vui lòng đăng nhập để sử dụng giỏ hàng"}, {status: 401})
        } 
        const res = await fetch(cart_change_url,{
            method: "POST",
            headers:{
                "Content-Type": 'application/json',
                "Authorization": `${access}`,
            },
            body: JSON.stringify(body)
        })
        return res
    }catch{
        return Response.json({message: "Đã xảy ra lỗi, vui lòng thử lại!"}, {status: 500})
    }
}


export async function PATCH(request){
    try{
        const cookieStore = await cookies()
        const access = cookieStore.get("access")?.value
        if (!access){
            return Response.json({message: 'Vui lòng đăng nhập để sử dụng giỏ hàng'},{status: 401})
        }
        const body = await request.json()
        const res = await fetch(cart_change_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${access}`
            },
            body: JSON.stringify(body),
        })
        return res
    }catch{
        return Response.json({message: "Đã có lỗi xảy ra, vui lòng thử lại sau!"}, {status: 500})
    }
}

export async function DELETE(request){
    try{
        const cookieStore = await cookies()
        const access = cookieStore.get('access')?.value
        if (!access){
            return Response.json({message:"Vui lòng đăng nhập để sử dụng giỏ hàng"}, {status: 401})
        }
        const body = await request.json()
        const res = await fetch(cart_change_url, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `${access}`
            },
            body: JSON.stringify(body)
        })
        return res
    }catch{
        return Response.json({message: "Đã có lỗi xảy ra, vui lòng thử lại sau!"}, {status: 500})
    }
}
