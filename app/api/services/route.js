export async function GET(){
    try{
        const api_url = process.env.API_URL + process.env.SERVICES_APPLICATION + process.env.SERVICES
        const res = await fetch(api_url)
        return res
    }
    catch{
        return Response.json({message: "Không có dịch vụ nào để hiển thị!"}, {status: 200})
    }
}