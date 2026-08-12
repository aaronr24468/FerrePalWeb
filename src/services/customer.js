const URL_PATH = import.meta.env.VITE_API_URL;

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

export const getInfoCredit = async(id) =>{
    const response = await fetch(`${URL_PATH}/credit/info/credit/${id}`,{
        method:'GET',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        }
    })

    return(response.json());
}

export const editCreditCustomer = async(id, amount, description) =>{
    const response = await fetch(`${URL_PATH}/credit/edit/credit`,{
        method: 'PUT',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id, amount, description})
    })

    return(response.json())
}

export const installmentCreditCustomer = async(id_credit, id_customer, amount) =>{
    const response = await fetch(`${URL_PATH}/credit/installment`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id_credit, id_customer, amount})
    })

    return(response.json())
}

export const payoutCreditCustomer = async(id_credit, id_customer) =>{
    const response = await fetch(`${URL_PATH}/credit/payout`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id_credit, id_customer})
    })

    return(response.json())
}

export const newCreditCustomer = async(id_customer, amountCredit, descriptionData) =>{
    const response = await fetch(`${URL_PATH}/credit/new/credit`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id_customer, amountCredit, descriptionData})
    })

    return(response.json())
}


export const historyInstallmentCredit = async(id_credit, id_customer) =>{
    const response = await fetch(`${URL_PATH}/credit/installment/history`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id_credit, id_customer})
    })

    return(response.json())
}