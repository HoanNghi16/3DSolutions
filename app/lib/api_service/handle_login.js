
async function post_login(request){
    const api_url = process.env.NEXT_PUBLIC_API_URL +process.env.NEXT_PUBLIC_LOGIN_APPLICATION
    const res = fetch(api_url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(request),}).then(res => res.json())
    const data = await res
    console.log(data)
}
