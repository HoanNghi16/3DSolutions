export async function GET(req, {params}) {
    const id = (await params)?.id
    const api_url =  process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `${id}/`
    const res = await fetch(api_url)
    return res
}