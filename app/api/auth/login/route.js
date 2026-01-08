import {cookies} from 'next/headers'
export async function POST(req){
    try{
        const body = await req.json()

        const res = await fetch(`${process.env.API_URL}${process.env.USERS_APPLICATION}${process.env.LOGIN}`, 
            {method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
        if (!res.ok){
            return Response.json({message: "Login Failed"}, {status: 401})
        }
        const {access, refresh} = await res.json()
        console.log(access, refresh)
        const cookieStore = await cookies()
        cookieStore.set('access', access, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
        })

        cookieStore.set('refresh', refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
        })
        return Response.json({message: "Login successful"}, {status: 200})
    }
    catch{
        return Response.json({message: "server Error"}, {status: 500})
    }
}