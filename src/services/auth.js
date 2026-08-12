const URL_PATH = import.meta.env.VITE_API_URL

export const authApi = async(username, password) =>{
    
    const res = await fetch(`${URL_PATH}/auth/login`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({username, password})
    })

    return(res.json());
}