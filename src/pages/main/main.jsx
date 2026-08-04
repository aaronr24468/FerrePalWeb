import '../../styles/main/main.css';




import close from '../../assets/close.svg'

import { useFerrepalHook } from '../../hooks/ferrepalHook';
import { AsideMain } from './aside';
import { MainScreenList } from './mainScreen';

export const MainScreen = ({ }) => {
    const { logOut, username, list, regiterCustomer, setName, setPhone, setAddress } = useFerrepalHook();

    return (
        <main className='ferrepal_main'>
            <div className="aside_account">
                <AsideMain logOut={logOut} username={username}/>
            </div>
            <section className='main_screen'>
                <MainScreenList  list={list}/>
            </section>

            <dialog id='new_customer' className='modal_customer'>
                <div className="container_modal_new_customer">
                    <button className="close_Modal" onClick={() => document.getElementById('new_customer').close()}>
                        <img src={close} className='logo_close' />
                    </button>
                    <form className='form_new_customer' onSubmit={regiterCustomer}>
                        <span className='title_register_customer'>Registro de Nuevo Cliente</span>

                        <div className="inputClientContainer">
                            <span className='title_input'>Nombre completo</span>
                            <input type="text" placeholder='Nombre completo' className='input_Data_customer' onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="inputClientContainer">
                            <span className='title_input'>Número de Celular</span>
                            <input type="text" placeholder='Ej. 317-000-0000' className='input_Data_customer' onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                        <div className="inputClientContainer">
                            <span className='title_input'>Dirección</span>
                            <textarea name="" id="" className='address_customer' placeholder='Calle, Número, Colonia, Ciudad...' onChange={(event) => setAddress(event.target.value)}></textarea>
                        </div>
                        <div className="buttons_Press">
                            <button className='btn_modal_customer' onClick={() => document.getElementById('new_customer').close()}>Cancelar</button>
                            <button className='btn_modal_customer registar_cliente'>Registrar Cliente</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </main>
    )
}