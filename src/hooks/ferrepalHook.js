import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getListCustomersEndpoint, getUserName, logoutService, newCustomer } from "../services/ferrpal";

export const useFerrepalHook = () =>{
    const navigate = useNavigate();

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[username, setUsername] = useState('Usuario');
    const[list, setList] = useState([])

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
        } catch (error) {
            setError(error.message || "Error de servidor")
        }
    }

    const regiterCustomer = async(event) =>{
        event.preventDefault();
        try {
            const status = await newCustomer(name, phone, address);
            if(!status.ok) return setError('Error al registrar cliente');
            alert('se registro con exito');
            setName(''), setPhone(''),setAddress('');
            document.getElementById('new_customer').close();
        } catch (error) {
            setError(error.message || 'Error de servidor');
        }
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
        if(tags === 'dialog'){
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
        setAddress
    }
}