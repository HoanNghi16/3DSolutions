export async function getProducts(page){
    const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCTS_APPLICATION + process.env.NEXT_PUBLIC_PRODUCTS
    const res = await fetch(api_url+`?page=${page}`).then(res => { console.log(res); return res.json()}).then( res => [res.total_pages,res.results])
    return res
}