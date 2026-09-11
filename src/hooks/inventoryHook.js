import { useEffect, useState, useCallback } from "react";
import { getListProducts } from "../services/customer";
import { editProductData, uploadImages, uploadNewP } from "../services/inventory";
import Swal from "sweetalert2";

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


    const[images, setImages] = useState([]);
    const[tempImages, setTempImages] = useState([]);
    const[reloadData, setReloadData] = useState(false)


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
        } finally {
            setLoading(false)
        }

    }

    const saveChanges = (id) => {
        try {

            Swal.fire({
                title: 'Confirmar cambios',
                showCancelButton: true,
                confirmButtonText: 'Gurdar',
                target: document.getElementById('modal_inventory')
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const res = await editProductData(id, dataProduct);
                    if (!res.ok) return Swal.fire({
                        icon: 'error',
                        title: `${res.message || "Error de servidor"}`
                    })


                    getProducts();
                    document.getElementById('modal_inventory').close();

                    Swal.fire({
                        icon: 'success',
                        title: 'Se realizo cambio exitosamente',
                    })
                }
            })


        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const ImagesFile = (event) =>{
        const files = event.target.files
        
        for(const file of files){
            const tempUrl = URL.createObjectURL(file)
            setTempImages((prev) => [...prev, tempUrl])
        }

        setImages(files);
    }

    const deleteImage = (index2) =>{
        let counter = 0
        let dataFilter = []

        const filterFile = tempImages.filter((element, index) =>{
            return(index2 != index)
        })
        
        for(const fileD of images){
            if(counter != index2) dataFilter.push(fileD)
            counter += 1;
        }
       
        setTempImages(filterFile)
        setImages(dataFilter)
    }

    const uploadNewProduct = async(event) =>{
        try {
            event.preventDefault();
            const form = event.target;
            const data = {
                name: form.nombre.value,
                codigo_barras: form.codigo.value,
                categoria: form.categoria.value,
                categoria_ferreteria: form.categoria_ferreteria.value,
                marca: form.marca.value,
                precio: form.precio.value,
                costo: form.costo.value,
                stock: form.stock.value,
                stock_minimo: form.minStock.value,
                unidad_medida: form.unidad.value,
                descripcion: form.descripcion.value
            }

            const response = await uploadNewP(data);

            if(!response.ok) return Swal.fire({
                icon: 'error',
                title: response.message
            })

            const formData = new FormData();

            for(const file of images){
                formData.append('images', file)
            }

            console.log(formData)
            
            const responseImage = await uploadImages(formData, response.id)

            if(!responseImage.ok) return Swal.fire({
                icon: 'error',
                title: response.message
            })

            document.getElementById('modal_new_product').close();

            setReloadData(true)

            Swal.fire({
                icon: 'success',
                title: 'Se subio producto con exito'
            })
        } catch (error) {
            setError(error.message || "Error de servidor")   
        }finally{
            setReloadData(false)
        }
    }

    const cuteText = (stringData) => {
        if (stringData.length > 26) {
            return (stringData.slice(0, 27) + "...")
        }
        return (stringData)
    }

    useEffect(() => {
        getProducts();
    }, [getProducts, reloadData])

    return {
        list,
        dataProduct,
        getionProduct,
        cuteText,
        dataProduct,
        loading,
        setDataProduct,
        saveChanges,
        ImagesFile,
        tempImages,
        deleteImage,
        uploadNewProduct
    }
}