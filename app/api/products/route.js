
export const GET = async (req) => {
    try{
        const {searchParams} = new URL(req.url)
        const page = searchParams.page || 1
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `?page=${page}`
        const res = await fetch(api_url)
        const data = await res.json()
        if(!res.ok){
            return Response.json({message: 'Failed'},{status: 401})
        }
        return Response.json(data)
    }catch (error){
        return Response.json({message: "Lỗi chỗ này"}, {error: error})
    }

}