import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router";
import '../styles/chechAuth/chechAuth.css';
import character from '../assets/ferrepalCharacter.png'


export const CheckAuthLogin = ({children}) =>{
    const[loading, setLoading] = useState(false);
    const[isAuth, setIsAuth] =  useState(false);
    const URL_PATH = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    

    const checkToken = useCallback(async() =>{
        try {
            setLoading(true)

            const resAuth = await fetch(`${URL_PATH}/authentification`,{
                method: 'GET',
                credentials: 'include',
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => res.json());

            const data = resAuth

            if(resAuth.ok){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
            
        } catch (error) {
            setIsAuth(false)
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(() =>{
        checkToken();
    }, [checkToken])

    if(loading) return <main className="check_container"><img className="characterLoading" src={character}/></main>

    if(!isAuth){
        
        return(children)
    }

    navigate('/FerrePal')
}