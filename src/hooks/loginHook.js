import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../services/auth";
import Swal from "sweetalert2";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginRoutine = async (event) => {
        event.preventDefault();
        try {
            if (username.length === 0 || password.length === 0) return ('')

            setLoading(true)

            const answer = await authApi(username, password)

            if (!answer.ok) return (Swal.fire(
                {
                    icon: 'Error',
                    title: answer.message,
                }
            ) || "Error de servidor")


            navigate('/FerrePal')
        } catch (error) {
            setError(error.nessage || "Ocurrio un error inesperado")
        } finally {
            setLoading(false)
        }
    }

    return {
        setUsername,
        setPassword,
        loginRoutine,
        loading
    }
}