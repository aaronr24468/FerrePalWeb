const URL_PATH = 'http://localhost:8181'

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