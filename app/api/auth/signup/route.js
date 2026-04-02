export async function POST(req){
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
    const data = await res.json()
    console.log(data)
    return res
}