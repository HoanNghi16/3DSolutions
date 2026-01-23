export async function GET(){
    try{
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.MATERIALS
        const res = await fetch(api_url)
        if(res.ok){
            return res}
    }
    catch{
        return Response.json({message: "Không có chất liệu để hiển thị"}, {status: 200})
    }
}