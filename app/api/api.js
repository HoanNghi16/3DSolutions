export const postLogout = async () =>{
    const res = await fetch('/api/auth/logout/', {
        method: "POST",
        credentials: 'include',
        })
    return res
}

export const getMe = async () => {
    const res = await fetch('/api/auth/me/',
        {
            credentials: 'include'
        }
    )
    return res
}

export const postLogin = async (request) => {
    const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    })
    return res
}

export const getProducts = async (page) => {
    const res = fetch("/api/products/")
    console.log(res)
    return res.json()
}