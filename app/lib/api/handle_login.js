"use client"
export async function post_login(request){
    const api_url = process.env.NEXT_PUBLIC_API_URL +process.env.NEXT_PUBLIC_USERS_APPLICATION + process.env.NEXT_PUBLIC_LOGIN
    const res = await fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
        credentials: 'include',})
    return res
}

export async function get_login_status(){
    const api_url = process.env.NEXT_PUBLIC_API_URL +process.env.NEXT_PUBLIC_USERS_APPLICATION + process.env.NEXT_PUBLIC_INFO
    const res = await fetch( api_url, {
        method: "GET",
        credentials: 'include'}).then(res => res.json())
    return res
}