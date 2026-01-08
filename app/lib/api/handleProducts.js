export async function getProducts(page){
    const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS
    const res = await fetch(api_url+`?page=${page}`).then(res => { console.log(res); return res.json()}).then( res => [res.total_pages,res.results])
    return res
}