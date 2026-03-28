import { cookies } from "next/headers";
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url)
        console.log(searchParams)
        const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.ADMIN_USERS + `?${searchParams.toString()}`
        const res = await fetch(api_url, {
            headers:{
                Cookie: (await cookies()).toString(),
            },
        })
        return res
    }catch{
        return Response.json({message: "Lỗi server"}, {status: 500})
    }
}

export async function PUT(request){
    try{
        const payload = await request.json();
        const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.ADMIN_USERS
        const res = await fetch(api_url, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                Cookie: (await cookies()).toString(),
            },
            body: JSON.stringify(payload)
        })
        return res
    }catch{
        Response.json({message: "Lỗi!"}, {status: 500})
    }

    
}