import { useCustomerHook } from '../../hooks/customerHook';
import '../../styles/customer/customerStyle.css';
import phone from '../../assets/phone.svg'
import address from '../../assets/address.svg'
import creditImg from '../../assets/plusWhite.svg'


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
    } = useCustomerHook();

    return (
        <main className="Customer_Main_container">
            <h1 className='title_Customer_component'>Perfil del Cliente</h1>

            <section className='info_customer'>
                <span className='customer_name'>{customer.full_name}</span>
                <span className='customer_data'><img className='phone_logo_svg' src={phone} /><span className='info_user_span'>Celular:</span> {customer.phone_Number}</span>
                <span className='customer_data'><img className='phone_logo_svg' src={address} /><span className='info_user_span'>Direccion:</span> {customer.address}</span>
            </section>

            <section className='credit_history'>
                <div className="headTitle">
                    <span className='credit_history_title'>Historial Completo de Creditos</span>

                    <button className='new_credit_customer' onClick={() => newCredit('credit')}><img className='img_new_credit' src={creditImg} />Nuevo credito</button>
                </div>

                <div className="credit_list_Container">
                    <CreditHistory credits={credits} infoCredit={infoCredit} showTicketModal={showTicketModal} historyInstallment={historyInstallment}/>
                </div>
            </section>

            {/* Modal para mostrar, editar, abonar, liquidar cuenta y mostrar historial de abonos */}
            <InfoCredit
                selectModal={selectModal}
                credit={credit}
                loading={loading}
                editCredit={editCredit}
                setAmount={setAmount}
                setDescription={setDescription}
                installmentCredit={installmentCredit}
                payoutCredit={payoutCredit}
                createNewCredit={createNewCredit}
                installmentH={installmentH}
                getProductNewCredit={getProductNewCredit}
                productsList={productsList}
                add_Product_credit_box={add_Product_credit_box}
                listSelected={listSelected}
                unit_of_measurement={unit_of_measurement}
            />

            {/* Modal para imprimir ticket de credito */}
            <TicketModal  credit={credit}/>
        </main>
    )
}