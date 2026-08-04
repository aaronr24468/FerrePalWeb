const URL_PATH = 'http://localhost:8181';

export const getAllInfoCustomer = async(id) =>{
    const response = await fetch(`${URL_PATH}/credit/info/customer/${id}`,{
        method: 'GET',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        }
    })

    return(response.json());
}