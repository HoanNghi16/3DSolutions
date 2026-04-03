export async function POST(req){
    try{
        const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.REGISTER
        const body = await req.json()
        const res = await fetch(api_url,{
            method: 'POST',
            headers: {
                'Accept-Encoding': 'identity',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        return res
    }catch{
        return Response({message: 'Lỗi server!'}, {status: 500})
    }
    
}