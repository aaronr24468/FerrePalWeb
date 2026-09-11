const URL_PATH = import.meta.env.VITE_API_URL;

export const editProductData = async(id, data) =>{
    const response = await fetch(`${URL_PATH}/products/edit/product/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return(response.json());
}

export const uploadNewP = async(data) =>{
    const response = await fetch(`${URL_PATH}/products/new/item`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return(response.json())
}

export const uploadImages = async(formData, id) =>{
    const response = await fetch(`${URL_PATH}/products/upload/photos/${id}`,{
        method: "POST",
        credentials: 'include',
        headers:{
            "Content_Type":"application/json"
        },
        body: formData
    })

    return(response.json())
}