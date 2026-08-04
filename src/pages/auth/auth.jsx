import '../../styles/auth/auth.css'
import ferrepal from '../../assets/ferrepalLogo.png';
import eye from '../../assets/eye.svg'
import tool from '../../assets/tool.svg'
import { useLogin } from '../../hooks/loginHook';
import character from '../../assets/ferrepalCharacter.png'
export const Auth = ({ }) => {
    const{loginRoutine, setPassword, setUsername, loading} = useLogin()

    return (
        <main className="main_Container">
            <form action="submit"></form>
            {Boolean(loading) && (<div className='loadingContainer'><img src={character} className='character'/></div>)}
            <form  className='auth_Container'>
                <img src={ferrepal} className='logo_Ferre' />

                <div className='main_Inputs'>
                    <div className="username boxIn">
                        <input type="text" className='inputData' placeholder='Usuario' onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="password boxIn">
                        <input type="password" className='inputData' id='showPW' placeholder='Contraseña' onChange={(event) => setPassword(event.target.value)}/>
                        <img src={eye} className='show_password' onClick={() => {
                            document.getElementById('showPW').type === "password" ?
                                (document.getElementById('showPW').type = 'text')
                                :
                                (document.getElementById('showPW').type = 'password')
                        }}
                        />

                    </div>
                </div>

                <button type='submit' className='btnLogin' onClick={loginRoutine}><img src={tool} className='tool'/> Entrar</button>
            </form>
        </main>
    )
}