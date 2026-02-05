export async function GET(){
    try{
        const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.CATEGORIES;
        const res = await fetch(api_url)
        return res
    }catch{
        return Response.json({message: "Không có danh mục nào"}, {status: 200})
    }
   
}