import { useEffect, useState, useCallback } from "react";
import { getListProducts } from "../services/customer";

export const useInventoryHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [list, setList] = useState([]);

    const [dataProduct, setDataProduct] = useState({
        id: '',
        images: '',
        nombre: '',
        codigo_barras: '',
        categoria_ferreteria: '',
        marca: '',
        precio: '',
        unidad_medida: '',
        stock: '',
        descripcion: ''
    })



    const getProducts = useCallback(async () => {
        try {
            setLoading(true);
            const products = await getListProducts();
            if (!products.ok) return setError(products.message);
            setList(products.products)
        } catch (error) {
            setError(error.message || "Error de servidor");
        } finally {
            setLoading(false);
        }
    }, [])

    const getionProduct = (data) => {
        try {
            setLoading(true)
            setDataProduct(data)
            document.getElementById('modal_inventory').showModal();
        } catch (error) {
            setError(error.message || "Error en la rutina")
        }finally{
            setLoading(false)
        }
        
    }

    const saveChanges = async(id) =>{
        try {
            console.log(id, dataProduct)
        } catch (error) {
            
        }
    }

    const cuteText = (stringData) =>{
        if(stringData.length > 26){
            return(stringData.slice(0, 27) + "...")
        }
        return(stringData)
    }

    useEffect(() => {
        getProducts();
    }, [getProducts])

    return {
        list,
        dataProduct,
        getionProduct,
        cuteText,
        dataProduct,
        loading,
        setDataProduct,
        saveChanges
    }
}