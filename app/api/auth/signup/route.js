export async function POST(req){
    const api_url = process.env.API_URL + process.env.USERS_APPLICATION + process.env.REGISTER
    const body = await req.json()
    try{    
        const res = await fetch(api_url,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        if (res.ok){
            return Response.json({message: "Đăng ký thành công"}, {status: 200})
        }
        return Response.json({message: "Đăng ký thất bại, vui lòng kiểm tra lại thông tin người dùng"}, {status: res.status})
    }
    catch{
        return res
    }
}