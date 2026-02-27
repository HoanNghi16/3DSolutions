const BASE_URL = process.env?.BASE_URL ?? "http://localhost:3000"

export const postLogout = async () =>{
    const res = await fetch(`${BASE_URL}/api/auth/logout/`, {
        method: "POST",
        credentials: 'include',
        })
    return res
}

export const getMe = async (customCookies = {}) => {
    const res = await fetch(`${BASE_URL}/api/auth/me/`,{
        headers:{
            ...customCookies
        },
        credentials: "include"
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

export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}/api/categories`)
    return res
}

export const getUserCart = async () => {
    const res = await fetch(`${BASE_URL}/api/cart`,{
        credentials: "include",
    })
    return res
}

export const addToCart = async (request) => {
    const res = await fetch(`${BASE_URL}/api/cart`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
        credentials: "include"
    })
    return res
}

export const deleteCart = async (request) => {
    const res = await fetch(`${BASE_URL}/api/cart`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        credentials: 'include'
    })
    return res
}

export const patchCart = async (request) => {
    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: 'PATCH',
        headers: {
            'Conten-Type': 'application/json',
        },
        body: JSON.stringify(request),
        credentials: 'include'
    })
    return res
}


export const getPreview = async (request) => {
    const res = await fetch(`${BASE_URL}/api/order/preview`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
        cache: 'no-store'
    })
    return res
}

export const postAddress = async (request) => {
    const res = await fetch(`${BASE_URL}/api/auth/me/address`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        credentials: 'include'
    })
    return res
}

export const postOrder = async (request) => {
    const res = await fetch(`${BASE_URL}/api/order`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request),
        credentials: 'include'
    })
    return res
}