export async function get_products(){
    const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION + process.env.NEXT_PUBLIC_PRODUCTS
    const res = await fetch(api_url).then(res => res.json())
    return res
}