export async function GET(){
    const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.MATERIALS
    const res = await fetch(api_url)
    if(res.ok){
        return res
    }
    return Response.json({message: "Không có sản chất liệu để hiển thị"})
}