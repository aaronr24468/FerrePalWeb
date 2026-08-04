const URL_PATH = 'http://localhost:8181'

export const logoutService = async() =>{
    const response = await fetch(`${URL_PATH}/authentification/logout`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        }
    })

    return(response.json());
}


export const getUserName = async() =>{
    const response = await fetch(`${URL_PATH}/authentification/info/user`,{
        method: 'GET',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        }
    })

    return(response.json());
}

export const getListCustomersEndpoint = async() =>{
    const response = await fetch(`${URL_PATH}/credit/list/customers`,{
        method: 'GET',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        }
    })
    return(response.json());
}

export const newCustomer = async(name, phone, address) =>{
    const response = await fetch(`${URL_PATH}/credit/new/customer`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name, phone, address})
    })

    return(response.json());
}