import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { editCreditCustomer, get_total_credit_amount, getAllInfoCustomer, getInfoCredit, getListProducts, historyInstallmentCredit, installmentCreditCustomer, newCreditCustomer, payoutCreditCustomer } from "../services/customer";

export const useCustomerHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [customer, setCustomer] = useState([]);
    const [credits, setCredits] = useState([]);

    const [credit, setCredit] = useState({
        Installment: "0.00",
        amount: "0.00",
        create_at: "dd/mm/yyy",
        description: "",
        status: "",
        updated_at: "",
        list_products: ''
    });

    const [selectModal, setSelectModal] = useState('Info') // seleccionamos que modal se va a mostrar
    const [installmentH, setInstallmentH] = useState([]) //guardar los historiales que obtengamos del back sobre el credito

    const [productsList, setProductsList] = useState([]); //para guardar la lista de productos del inventario y mostrarlos en el front para seleccionar
    const [productsListEdit, setProductListEdit] = useState([]) //lista para guardar el credito editado
    const [filterProducts, setFilterProducts] = useState([]); //filtrar la lista por el codigo de barras o en su defecto por nombre
    const [listSelected, setListSelected] = useState([]) //guardamos los productos seleccionados para el credito
    const [totalCredit, setTotalCredit] = useState('0.00'); //guardamos el total del credito, este dato lo obtenemos del backEnd
    const [totalCreditEdit, setTotalCreditEdit] = useState('0.00'); //guardamos el total del credito al editar el mismo, este dato lo obtenemos del backEnd
    const [productsCreditEdit, setProductsCreditEdit] = useState([]);

    const { id } = useParams();

    //metodo para obtener los datos del cliente
    const infoCustomer = async () => {
        try {
            setLoading(true)
            const data = await getAllInfoCustomer(id);
            if (!data.ok) return (setError(data.message || "Error de servidor"));
            setCustomer(data.customer), setCredits(data.credits);
        } catch (error) {
            setError(error.message || "Error de servidor")
        } finally {
            setLoading(false)
        }
    }


    // metodo para obtener la informacion del cliente y todos sus credito
    const infoCredit = async (id_credit, modal) => {
        try {
            setLoading(true)
            setSelectModal(modal)
            document.getElementById('info_credit').showModal()
            const data = await getInfoCredit(id_credit);
            setProductsCreditEdit(data.listP)
            setCredit(data.info)
        } catch (error) {
            setError(error.message || "Error de servidor")
        } finally {
            setLoading(false)
        }
    }


    // metodo que nos permite editar el credito, agregar mas productos y crear un historial de los nuevos movimientos
    const editCredit = async (id_credit, textareaRef, refDescription) => {
        try {
            const id = id_credit; //id del credito del cliente

            const asnwer = await editCreditCustomer(id, productsCreditEdit)

            if (!asnwer.ok) return setError(asnwer.message || 'Error de servidor');

            document.getElementById('info_credit').close()

            Swal.fire({
                icon: 'success',
                title: 'Se actualizo el credito con exito',
            })

            infoCustomer();
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }


    // metodo para crear un registro de los abonos del credito
    const installmentCredit = async (id_credit, id_customer) => {
        try {
            const amount = document.getElementById('installment_input').value;
            const asnwer = await installmentCreditCustomer(id_credit, id_customer, amount);
            if (!asnwer.ok) return setError(Swal.fire({
                icon: 'error',
                title: asnwer.message,
                target: document.getElementById("info_credit")
            }) || "Error de servidor")

            document.getElementById('info_credit').close()

            Swal.fire({
                icon: 'success',
                title: 'Se realizo abono con exito',
            })

            infoCustomer();
            document.getElementById('installment_input').value = ""
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }


    // metodo para registrar la liquidacion del credito
    const payoutCredit = async (id_credit, id_customer) => {
        try {
            const asnwer = await payoutCreditCustomer(id_credit, id_customer)
            if (!asnwer.ok) return setError(Swal.fire({
                icon: 'error',
                title: asnwer.message
            }) || "Error de servidor")
            infoCustomer();
            document.getElementById('info_credit').close()
            Swal.fire({
                icon: 'success',
                title: 'Se liquido credito con exito',
            })
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }


    // obtenemos la lista de productos cuando le demos focus al input 
    const getProductNewCredit = async (search) => {
        try {

            if (document.getElementById('list_products_select_credit').style.display !== "block") {
                document.getElementById('list_products_select_credit').style.display = "block"
                setLoading(true);
                const products = await getListProducts();
                console.log(products.products)
                setProductsList(products.products)
            }

            if (search.length > 0) {
                const products = await getListProducts();
                const filterData = products.products.filter((element) => {
                    console.log(element.nombre.toLowerCase().includes(search.toLowerCase()))

                    return (element.nombre.toLowerCase().includes(search.toLowerCase()) || element.codigo_barras.toLowerCase().includes(search.toLowerCase()))
                })
                setProductsList(filterData)
            }else{
                const products = await getListProducts();
                setProductsList(products.products)
            }
            
        } catch (error) {
            setError(error.message || "Error de servidor")
        } finally {
            setLoading(false)
        }
    }


    //obtenemos la lista de productos para editar la lista
    const getProductEditCredit = async (search) => {

        const dato = search || 0;

        try {

            if(dato.length > 0){
                const products = await getListProducts();
                const filterData = products.products.filter((element) =>{
                    return(element.nombre.toLowerCase().includes(search.toLowerCase()) || element.codigo_barras.toLowerCase().includes(search.toLowerCase()));
                })
                setProductListEdit(filterData)
            }else{
                const products = await getListProducts();
                setProductListEdit(products.products)
            }
            
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }


    //sacamos el total del valor del credito que se va a crear
    const total_credit_amount = async () => {
        try {
            const list = listSelected;

            const data = await get_total_credit_amount(list)
            setTotalCredit(String(data.amount))
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    //sacamos el total del valor del credito a editar
    const total_credit_amount_edit = async () => {
        try {
            const creditList = productsCreditEdit
            const data = await get_total_credit_amount(creditList)
            setTotalCreditEdit(String(data.amount))
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }


    // corroboramos que este producto ya este para evitarnos duplicaciones inecesarias-------------------------------------------------------------------------------
    const add_Product_credit_box = (list) => {
        if (listSelected.some(item => item.id_product === list.id_product)) {
            Swal.fire({
                icon: 'warning',
                title: 'Ya esta en la lista',
                target: document.getElementById('info_credit')
            })
        } else {
            setListSelected(prevList => [...prevList, list])
        }

    }

    //agregarmos producto nuevos al editar y corroboramos que no tengamos productos duplicados
    const add_Product_edit_box = (list) => {
        if (productsCreditEdit.some(item => item.id_product === list.id_product)) {
            Swal.fire({
                icon: 'warning',
                title: 'Ya se encuentra en la lista',
                target: document.getElementById('info_credit')
            })
        } else {
            setProductsCreditEdit(prevList => [...prevList, list])
        }
    }


    // cambiamos el valor de unidad de medida del producto para saber si lo vamos a cobrar por pieza o a granel-----------------------------------------------------
    const unit_of_measurement = (event) => {
        const state = event.target.checked;
        const id = Number(event.target.id);

        setListSelected(prevProducts =>
            prevProducts.map(item =>
                item.id_product === id
                    ? { ...item, unidad_medida: state ? "kg" : "pieza" }
                    : item
            )
        );
    }

    // metodo para agregar cantidades de piezas que el cliente se va a llevar-------------------------------------------------------------------------------------
    const more_less_unite = (event) => {
        const button = event.target;
        const id = Number(event.target.id);
        const state = button.getAttribute('quantity');

        setListSelected(prevList =>
            prevList.map((item) =>
                item.id_product === id
                    ? { ...item, quantity: state === "true" ? (item.quantity + 1) : (item.quantity === 1 ? (item.quantity = 1) : (item.quantity - 1)) }
                    : item
            )
        )
    }

    //metodo para cambiar el valor a granel del producto en su objeto correspondiente-----------------------------------------------------------------------------
    const set_Kilograms_quantity = (event) => {
        const id = Number(event.target.id);
        const value = Number(event.target.value);

        setListSelected((prevList) =>
            prevList.map((item) =>
                item.id_product === id
                    ? { ...item, kg: value, quantity: value }
                    : item
            )
        )
    }



    const more_less_unite_edit = (event) => {
        const button = event.target;
        const id = Number(event.target.id);
        const state = button.getAttribute('quantity');

        setProductsCreditEdit(prevList =>
            prevList.map((item) =>
                item.id_product === id
                    ? { ...item, quantity: state === "true" ? (item.quantity + 1) : (item.quantity === 1 ? (item.quantity = 1) : (item.quantity - 1)) }
                    : item
            )
        )
    }

    const set_Kilograms_quantity_edit = (event) => {
        const id = Number(event.target.id);
        const value = Number(event.target.value);

        setProductsCreditEdit((prevList) =>
            prevList.map((item) =>
                item.id_product === id
                    ? { ...item, kg: value, quantity: value }
                    : item
            )
        )
    }


    // metodo para crear el registro del nuevo credito------------------------------------------------------------------------------------------------------------
    const createNewCredit = async () => {
        try {
            const id_customer = customer.id; //obtenermos el id del cliente por medio del useState donde tenemos toda su informacion

            const asnwer = await newCreditCustomer(id_customer, listSelected, totalCredit);

            if (!asnwer.ok) return (Swal.fire({
                icon: 'error',
                title: asnwer.message,
                target: document.getElementById('info_credit')
            }) || "Error de servidor");

            infoCustomer();

            Swal.fire({
                icon: 'success',
                title: 'Se creo credito con exito'
            })

            document.getElementById('info_credit').close()

        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    // mostramos el modal para crear un nuevo credito--------------------------------------------------------------------------------------------------------------
    const newCredit = (modal) => {
        setSelectModal(modal)
        document.getElementById('info_credit').showModal()
    }


    // metodo para mostrar el modal y a su vez la informacion a imprimir en el ticket--------------------------------------------------------------------------------
    const showTicketModal = async (id_credit) => {
        try {
            setLoading(true);
            document.getElementById('ticket_credit').showModal();
            const data = await getInfoCredit(id_credit);
            setCredit(data.info)
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    // metodo el cual obtenemos el historial de los abonos------------------------------------------------------------------------------------------------------------
    const historyInstallment = async (id_credit, id_customer, modal) => {
        try {
            setLoading(true)
            setSelectModal(modal)
            setInstallmentH([])
            document.getElementById('info_credit').showModal()
            const data = await historyInstallmentCredit(id_credit, id_customer)

            if (!data.ok) return setError(data.message || "Error de servidor")

            setInstallmentH(data.data)
        } catch (error) {
            setError(error.message || 'Error de servidor')
        } finally {
            setLoading(false)
        }
    }

    window.addEventListener('click', (event) => {
        const target = event.target.localName;
        const id = event.target.id || null;

        if (target === "dialog") {
            document.getElementById(`${id}`)?.close();
            document.getElementById('list_products_select_credit')?.style.setProperty("display", "none");
        }

        if (event.target.className === "new_credit_container") {
            document.getElementById('list_products_select_credit')?.style.setProperty("display", "none");
        }
    })

    useEffect(() => {
        if (productsCreditEdit.length === 0) return
        total_credit_amount_edit();
    }, [productsCreditEdit])

    useEffect(() => {
        if (listSelected.length === 0) return
        total_credit_amount();
    }, [listSelected])

    useEffect(() => {
        infoCustomer();
    }, [])

    return {
        customer,
        credits,
        infoCredit,
        selectModal,
        credit,
        loading,
        editCredit,
        installmentCredit,
        payoutCredit,
        newCredit,
        createNewCredit,
        showTicketModal,
        historyInstallment,
        installmentH,
        getProductNewCredit,
        productsList,
        add_Product_credit_box,
        listSelected,
        unit_of_measurement,
        more_less_unite,
        set_Kilograms_quantity,
        totalCredit,
        productsCreditEdit,
        more_less_unite_edit,
        set_Kilograms_quantity_edit,
        totalCreditEdit,
        getProductEditCredit,
        productsListEdit,
        add_Product_edit_box
    }
}