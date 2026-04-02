import { cookies} from "next/headers";

export async function GET(){
    try{
        const cookieStore = await cookies()
        const res = await fetch(`${process.env.API_URL + process.env.USERS_APPLICATION + process.env.INFO}`,{
            headers: {
                'Accept-Encoding': 'identity',
                Cookie: cookieStore.toString()
            },
        }
        )
        if (!res.ok){
            return Response.json({message:"Access token invalid!"}, {status: 401})
        }
        const user = await res.json()
        return Response.json(user)
    }catch{
        return Response.json({message: "Server failed"}, {status: 500})
    }
}