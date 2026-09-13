export const cuteText = (stringData) => {
    if (stringData.length > 26) {
        return (stringData.slice(0, 27) + "...")
    }
    return (stringData)
}

export const deleteProducts = (id, list) =>{
    const filter = list.filter((element, index) =>{
            return(element.id_product != id)
    })
    return filter
}