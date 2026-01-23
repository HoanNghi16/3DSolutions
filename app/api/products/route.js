export const GET = async (req) => {
    try{
        const {searchParams} = new URL(req.url)
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `?${searchParams.toString()}`
        const res = await fetch(api_url)
        return res
    }catch{
        return Response.json({message: "Không có sản phẩm nào để hiển thị!"}, {status: 200})
    }

}