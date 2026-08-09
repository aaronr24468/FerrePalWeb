import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getListCustomersEndpoint, getUserName, logoutService, newCustomer } from "../services/ferrpal";
import Swal from "sweetalert2";


export const useFerrepalHook = () =>{
    const navigate = useNavigate();

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[username, setUsername] = useState('Usuario');
    const[list, setList] = useState([])
    const[listData, setListData] = useState([])

    const[name, setName] = useState('');
    const[phone, setPhone] = useState('');
    const[address, setAddress] = useState('');

    const infoUser = async() =>{
        try {
            const name = await getUserName();
            const usuario = name.user[0].username
            setUsername(usuario)
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const getListCustomers = async() =>{
        try {
            const list = await getListCustomersEndpoint();
            if(!list.ok) return setError(list.message || "Error de servidor");
            setList(list.data)
            setListData(list.data)
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const regiterCustomer = async(event) =>{
        event.preventDefault();
        try {
            const status = await newCustomer(name, phone, address);

            if(!status.ok) return setError(Swal.fire({
                icon: 'error',
                title: status.message,
                target: document.getElementById('new_customer')
            }) || "Error de servidor");

            setName(''), setPhone(''),setAddress('');

            document.getElementById('data_customer_input').value = ''
            document.getElementById('data_customer_input_phone').value = ''
            document.getElementById('data_customer_input_address').value = ''

            getListCustomers();

            document.getElementById('new_customer').close();

            Swal.fire({
                icon: 'success',
                title: 'Se creo perfil exitosamente'
            })

        } catch (error) {
            setError(error.message || 'Error de servidor');
        }
    }

    const filterByName = (event) =>{
        const value = event.target.value;
        const filtrado = listData.filter((element) =>{
            return(element.full_name.toLowerCase().includes(value.toLowerCase()))
        })
        setList(filtrado)
    }

    const logOut = async() =>{
        try {
            const asnwer = await logoutService();

            if(!asnwer.ok) return setError(asnwer.message || 'Error de servidor')
            
            navigate('/')
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    window.addEventListener('click', (event) =>{
        const tags = event.target.localName;
        const id = event.target.id
        if(tags === 'dialog' && id==="new_customer"){
            document.getElementById('new_customer').close()
        }
    })

    useEffect(() =>{
        infoUser();
        getListCustomers();
    }, [])

    return{
        logOut,
        username,
        list,
        regiterCustomer,
        setName,
        setPhone,
        setAddress,
        name,
        phone,
        address,
        filterByName
    }
}