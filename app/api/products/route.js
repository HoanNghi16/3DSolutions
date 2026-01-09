import { request } from "http"

export const GET = async () => {
    const page = request
    console.log("Đây là từ phía route",page)
    const api_url = process.env.API_URL + process.env.PRODUCTS_APPLICATION + process.env.PRODUCTS + `?page=${page}`
    const res = await fetch(api_url)
    return res.json()
}