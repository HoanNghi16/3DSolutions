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
    return res.json()
}

export const getProducts = async (page) => {
    const res = await fetch(`${BASE_URL}/api/products?page=${page}`);
    return res.json()
}

export const getDetails = async (id) => {
    console.log("Test id", id)
    const res = await fetch(`${BASE_URL}/api/products/${id}`)
    console.log("thử response", res)
}