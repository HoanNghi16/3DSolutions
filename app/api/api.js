

const BASE_URL = process.env?.BASE_URL ?? "http://localhost:3000"

export const postLogout = async () =>{
    const res = await fetch(`${BASE_URL}/api/auth/logout/`, {
        method: "POST",
        credentials: 'include',
        })
    return res
}

export const getMe = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me/`,
        {
            credentials: 'include'
        }
    )
    return res
}

export const postLogin = async (request) => {
    const res = await fetch(`${BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    })
    return res
}


export const postSignup = async (request) => {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    })
    return res
}

export const getProducts = async (kwargs) => {
    const params = new URLSearchParams(kwargs)
    console.log ("getProducts", params)
    const res = await fetch(`${BASE_URL}/api/products?${params.toString()}`);
    return res
}

export const getProductDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/api/products/${id}`)
    return res
}

export const getMaterials = async () =>{
    const res = await fetch(`${BASE_URL}/api/materials`)
    return res
}

export const getServices = async () => {
    const res = await fetch(`${BASE_URL}/api/services`)
    return res
}