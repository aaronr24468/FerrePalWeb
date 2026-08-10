import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { editCreditCustomer, getAllInfoCustomer, getInfoCredit, historyInstallmentCredit, installmentCreditCustomer, newCreditCustomer, payoutCreditCustomer } from "../services/customer";

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
    const[installmentH, setInstallmentH] = useState([])

    const[amount, setAmount] = useState('0.00');
    const[description, setDescription] = useState('')

    const { id } = useParams();

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

    const editCredit = async (id_credit, textareaRef, refDescription) => {
        try {
            const id = id_credit;
            const amount = document.getElementById('amount_money').value;
            const description = textareaRef.current.value;


            if(refDescription.length === description.length && amount=="+0.00") return(Swal.fire({
                icon: 'error',
                title: 'No has realizado ningun cambio',
                target: document.getElementById('info_credit')
            }))

            const asnwer = await editCreditCustomer(id, amount, description)

            if(!asnwer.ok) return setError(asnwer.message || 'Error de servidor');

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

    const installmentCredit = async(id_credit, id_customer) =>{
        try {
            const amount = document.getElementById('installment_input').value;
            const asnwer = await installmentCreditCustomer(id_credit, id_customer, amount);
            if(!asnwer.ok) return setError(Swal.fire({
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
            document.getElementById('installment_input').value=""
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const payoutCredit = async(id_credit, id_customer) =>{
        try {
            const asnwer = await payoutCreditCustomer(id_credit, id_customer)
            if(!asnwer.ok) return setError(Swal.fire({
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

    const createNewCredit = async(textarea, input) =>{
        try {
            const amountCredit = document.getElementById('input_amount_data').value;
            const descriptionData = document.getElementById('input_description').value;
            const id_customer = customer.id;
            const asnwer = await newCreditCustomer(id_customer, amountCredit, descriptionData);

            if(!asnwer.ok) return(setError( Swal.fire({
                icon: 'error',
                title: asnwer.message,
                target: document.getElementById('info_credit')
            }) || "Error de servidor"))

            infoCustomer();

            Swal.fire({
                icon: 'success',
                title: 'Se creo credito con exito'
            })

            document.getElementById('info_credit').close()
            document.getElementById('input_amount_data').value = ''
            document.getElementById('input_description').value = ''

        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const newCredit = (modal) =>{
        setSelectModal(modal)
        document.getElementById('info_credit').showModal()
    }

    const showTicketModal = async(id_credit) =>{
        try {
            setLoading(true);
            document.getElementById('ticket_credit').showModal();
            const data = await getInfoCredit(id_credit);
            setCredit(data.info)
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const historyInstallment = async(id_credit, id_customer, modal) =>{
        try {
            setLoading(true)
            setSelectModal(modal)
            setInstallmentH([])
            document.getElementById('info_credit').showModal()
            const data = await historyInstallmentCredit(id_credit, id_customer)

            if(!data.ok) return setError(data.message || "Error de servidor")

            setInstallmentH(data.data)
        } catch (error) {
            setError(error.message || 'Error de servidor')
        }finally{
            setLoading(false)
        }
    }

    window.addEventListener('click', (event) => {
        const target = event.target.localName;
        const id = event.target.id || null;
        if (target === "dialog") document.getElementById(`${id}`).close();
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
        installmentH
    }
}