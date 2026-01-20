export const GET = async (req) => {
    try{
        const {searchParams} = new URL(req.url)
        console.log("route params",searchParams.toString())
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `?${searchParams.toString()}`
        console.log("api_url", api_url)
        const res = await fetch(api_url)
        const data = await res.json()
        if(!res.ok){
            return Response.json({message: 'Failed'},{status: 401})
        }
        return Response.json(data)
    }catch{
        return Response.json({message: "Lỗi chỗ này"}, {status: 404})
    }

}