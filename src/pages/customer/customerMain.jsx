import { useCustomerHook } from '../../hooks/customerHook';
import '../../styles/customer/customerStyle.css';
import phone from '../../assets/phone.svg'
import address from '../../assets/address.svg'
import creditImg from '../../assets/plusWhite.svg'
import back from '../../assets/back.svg'
import downArrow from '../../assets/downArrow.svg'
import ferrepalCharacter from '../../assets/ferrepalCharacter.png';


import { CreditHistory } from './history';
import { InfoCredit } from './modalInfo';
import { TicketModal } from './ticketModal';

export const CustomerMain = ({ }) => {
    const {
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
        add_Product_edit_box,
        deleteProductEditCredit,
        deleteProductNewCredit,
        showProducts,
        editListCredit,
        showListCredit,
        deleteProductCreditCustomer,
        deleteCredit,
        setStatusCredit,
        statusCredit,
        loadingModal,
        loadingMain
    } = useCustomerHook();


    return (
        <main className="Customer_Main_container">
            {loadingMain ?
                <>
                    <div className="loading_main_customer_info">
                        <img src={ferrepalCharacter} alt="" className='loading_logo_main'/>
                    </div>
                </>
                :
                <>
                    <a className='btn_back_credit' href='/FerrePal'><img className='back_btn_svg' src={back} alt="" /></a>

                    <h1 className='title_Customer_component'>Perfil del Cliente</h1>

                    <section className='info_customer'>
                        <span className='customer_name'>{customer.full_name}</span>
                        <span className='customer_data'><img className='phone_logo_svg' src={phone} /><span className='info_user_span'>Celular:</span> {customer.phone_Number}</span>
                        <span className='customer_data'><img className='phone_logo_svg' src={address} /><span className='info_user_span'>Direccion:</span> {customer.address}</span>
                    </section>

                    <section className='credit_history'>
                        <div className="headTitle">
                            <span className='credit_history_title'>Historial Completo de Creditos</span>
                            <button className='select_status_credit'>
                                {statusCredit === 'Desabilitado' ? 'Cancelado' : statusCredit}
                                <img className='downArrow' src={downArrow} alt="" />
                                <section className='select'>
                                    <span className='select_status' onClick={() => setStatusCredit('Activo')}>Activo</span>
                                    <span className='select_status' onClick={() => setStatusCredit('Pagado')}>Pagado</span>
                                    <span className='select_status' onClick={() => setStatusCredit('Desabilitado')}>Cancelado</span>
                                </section>
                            </button>

                            <button className='new_credit_customer' onClick={() => newCredit('credit')}><img className='img_new_credit' src={creditImg} />Nuevo credito</button>
                        </div>

                        <div className="credit_list_Container">
                            <CreditHistory credits={credits} infoCredit={infoCredit} showTicketModal={showTicketModal} historyInstallment={historyInstallment} statusCredit={statusCredit} />
                        </div>
                    </section>

                    {/* Modal para mostrar, editar, abonar, liquidar cuenta y mostrar historial de abonos */}
                    <InfoCredit
                        selectModal={selectModal}
                        credit={credit}
                        loading={loading}
                        editCredit={editCredit}
                        installmentCredit={installmentCredit}
                        payoutCredit={payoutCredit}
                        createNewCredit={createNewCredit}
                        installmentH={installmentH}
                        getProductNewCredit={getProductNewCredit}
                        productsList={productsList}
                        add_Product_credit_box={add_Product_credit_box}
                        listSelected={listSelected}
                        unit_of_measurement={unit_of_measurement}
                        more_less_unite={more_less_unite}
                        set_Kilograms_quantity={set_Kilograms_quantity}
                        totalCredit={totalCredit}
                        productsCreditEdit={productsCreditEdit}
                        more_less_unite_edit={more_less_unite_edit}
                        set_Kilograms_quantity_edit={set_Kilograms_quantity_edit}
                        totalCreditEdit={totalCreditEdit}
                        getProductEditCredit={getProductEditCredit}
                        productsListEdit={productsListEdit}
                        add_Product_edit_box={add_Product_edit_box}
                        deleteProductEditCredit={deleteProductEditCredit}
                        deleteProductNewCredit={deleteProductNewCredit}
                        showProducts={showProducts}
                        editListCredit={editListCredit}
                        showListCredit={showListCredit}
                        deleteProductCreditCustomer={deleteProductCreditCustomer}
                        customer={customer}
                        deleteCredit={deleteCredit}
                        loadingModal={loadingModal}
                    />

                    {/* Modal para imprimir ticket de credito */}
                    <TicketModal credit={credit} showProducts={showProducts} loadingModal={loadingModal} />
                </>
            }

        </main>
    )
}