import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { editCreditCustomer, getAllInfoCustomer, getInfoCredit, getListProducts, historyInstallmentCredit, installmentCreditCustomer, newCreditCustomer, payoutCreditCustomer } from "../services/customer";

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
        updated_at: ""
    });
    const [selectModal, setSelectModal] = useState('Info')
    const [installmentH, setInstallmentH] = useState([])

    const [amount, setAmount] = useState('0.00');
    const [description, setDescription] = useState('')

    const [productsList, setProductsList] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [listSelected, setListSelected] = useState([])

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
            const id = id_credit;
            const amount = document.getElementById('amount_money').value;
            const description = textareaRef.current.value;


            if (refDescription.length === description.length && amount == "+0.00") return (Swal.fire({
                icon: 'error',
                title: 'No has realizado ningun cambio',
                target: document.getElementById('info_credit')
            }))

            const asnwer = await editCreditCustomer(id, amount, description)

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
    const getProductNewCredit = async () => {
        try {
            if (document.getElementById('list_products_select_credit').style.display !== "block") {
                document.getElementById('list_products_select_credit').style.display = "block"
                setLoading(true);
                const products = await getListProducts();
                setProductsList(products.products)
            }
        } catch (error) {
            setError(error.message || "Error de servidor")
        } finally {
            setLoading(false)
        }
    }

    // corroboramos que este producto ya este para evitarnos duplicaciones inecesarias
    const add_Product_credit_box = (list) => {
        if (listSelected.some(item => item.id_product === list.id_product)) {
            Swal.fire({
                icon: 'info',
                title: 'Ya esta en la lista',
                target: document.getElementById('info_credit')
            })
        } else {
            setListSelected(prevList => [...prevList, list])
        }
    }



    // cambiamos el valor de unidad de medida del producto para saber si lo vamos a cobrar por pieza o a granel
    const unit_of_measurement = (event) => {
        const state = event.target.checked;
        const id = event.target.id

        setListSelected(prevProducts =>
            prevProducts.map(item =>
                item.id_product === Number(id)
                    ? { ...item, unidad_medida: state ? "kg" : "pieza" }
                    : item
            )
        );
    }


    // metodo para crear el registro del nuevo credito
    const createNewCredit = async () => {
        try {
            const id_customer = customer.id;

            // const asnwer = await newCreditCustomer(id_customer);

            // if(!asnwer.ok) return(setError( Swal.fire({
            //     icon: 'error',
            //     title: asnwer.message,
            //     target: document.getElementById('info_credit')
            // }) || "Error de servidor"))

            // infoCustomer();

            // Swal.fire({
            //     icon: 'success',
            //     title: 'Se creo credito con exito'
            // })

            // document.getElementById('info_credit').close()

        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    // mostramos el modal para crear un nuevo credito
    const newCredit = (modal) => {
        setSelectModal(modal)
        document.getElementById('info_credit').showModal()
    }


    // metodo para mostrar el modal y a su vez la informacion a imprimir en el ticket
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

    // metodo el cual obtenemos el historial de los abonos
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
            document.getElementById(`${id}`).close();
            document.getElementById('list_products_select_credit').style.display = "none"
        }

        if (event.target.className === "new_credit_container") {
            document.getElementById('list_products_select_credit').style.display = "none"
        }
    })

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
        setAmount,
        setDescription,
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
        unit_of_measurement
    }
}