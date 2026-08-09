import plus from '../../assets/plus.svg';
import search from '../../assets/search.svg';
import { useNavigate } from 'react-router';

export const MainScreenList = ({ list, filterByName }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="title_container">
                <span className='title_customers'>Gestion de clientes</span>

                <div className="new_Customer_Container" title='Nuevo cliente'>
                    <button className='btn_new_customer' onClick={() => document.getElementById('new_customer').showModal()} >
                        <img className='plus_logo_customer' src={plus} />
                    </button>
                </div>
            </div>

            <div className="inputNamesContainer">
                <input className='names_Filter_Input' type="text" placeholder='Filtrar por nombre' onChange={filterByName}/>
                <div className="imageSearch">
                    <img src={search} className='search_image' />
                </div>
            </div>
            <div className="containerListCustomers">
                <div className="data_customers">
                    <div className="data_info"><span className='data_c'>Nombre</span></div>
                    <div className="data_info"><span className='data_c'>Telefono</span></div>
                    <div className="data_info"><span className='data_c'>Direccion</span></div>
                    <div className="data_info"><span className='data_c'>Creditos</span></div>
                </div>
                <ul className='listUl'>
                    {list.map((element, index) => {
                        return (
                            <li key={index} className='container_list_li'>
                                <button className='select_Customer' onClick={() => navigate(`/FerrePal/cliente/${element.id}`)}>
                                    <div className="data_list"><span className='list_info'>{element.full_name}</span></div>
                                    <div className="data_list"><span className='list_info'>{element.phone_Number}</span></div>
                                    <div className="data_list"><span className='list_info'>{element.address}</span></div>
                                    <div className="data_list"><span className='list_info'>{element.total_creditos}</span></div>
                                </button>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </>
    )
}