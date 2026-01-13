// export async function postLogin(request){
//     const api_url = process.env.API_URL +process.env.USERS_APPLICATION + process.env.LOGIN
//     const res = await fetch(api_url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(request),
//         credentials: 'include',})
//     return res

// }
export async function getUserInfo(){
    const api_url = process.env.NEXT_PUBLIC_API_URL +process.env.NEXT_PUBLIC_USERS_APPLICATION + process.env.NEXT_PUBLIC_INFO
    const res = await fetch( api_url, {
        method: "GET",
        credentials: 'include'}) // Lấythông tin người dùng từ server 
    return res
}

export async function postRegister(request){
    const api_url = process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_USERS_APPLICATION + process.env.NEXT_PUBLIC_REGISTER
    const res = await fetch(api_url, {
        method : "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    return res
}

export async function postLogout(){
    const api_url = process.env.NEXT_PUBLIC_API_URL +process.env.NEXT_PUBLIC_USERS_APPLICATION + process.env.NEXT_PUBLIC_LOGOUT
    const res = await fetch(api_url, {
        method: "POST",
        credentials: 'include',})
    return res
}