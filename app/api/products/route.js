
export const GET = async (req) => {
    try{
        const {searchParams} = new URL(req.url)
        const page = searchParams.get('page') ?? 1
        console.log("Trang nè", page)
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `?page=${page}`
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