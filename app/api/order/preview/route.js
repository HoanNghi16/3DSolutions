export async function POST(request){
    try{
        const api_url = process.env.API_URL + process.env.ORDERS_APPLICATION + process.env.PREVIEW
        const body = await request.json()
        const res = await fetch(api_url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(res.status === 400){
            return Response.json({message: "Insufficient stock"})
        }
        return res
    }catch{
        return Response.json({message: "Please choose a product or add something to your cart"}, {status: 404})
    }
}