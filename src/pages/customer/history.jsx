import eyes from '../../assets/eyes.svg'
import pencil from '../../assets/pencil.svg'
import money from '../../assets/money.svg'
import receipt from '../../assets/receipt.svg'
import lisInstallment from '../../assets/listInstallment.svg'
import dayjs from 'dayjs';

export const CreditHistory = ({ credits, infoCredit, showTicketModal, historyInstallment }) => {

    return (
        <>
            <section className='data_contaniner_credit'>
                <div className="data_title"><span className='title_list'>Fecha de Inicio</span></div>
                <div className="data_title"><span className='title_list'>Monto Total</span></div>
                <div className="data_title"><span className='title_list'>Total Abonado</span></div>
                <div className="data_title"><span className='title_list'>Saldo Pendiente</span></div>
                <div className="data_title"><span className='title_list'>Ultimo Cambio</span></div>
                <div className="data_title"><span className='title_list'>Estado</span></div>
            </section>
            <ul className='list_credit_customer'>
                {credits.map((element, index) => {
                    return (
                        <li key={index} className='list_credit'>
                            <div className="buttons_credit_details">
                                <button className="info_buttons" onClick={() => showTicketModal(element.id)}><img className='svg_buttons' src={receipt} alt="" /></button>
                                <button className="info_buttons" onClick={() => infoCredit(element.id, 'Info')}><img className='svg_buttons' src={eyes} alt="" /></button>
                                {element.status != "Pagado" && <button className="info_buttons" onClick={() => infoCredit(element.id, 'Edit')}><img className='svg_buttons' src={pencil} alt="" /></button>}
                                {element.status != "Pagado" && <button className="info_buttons" onClick={() => infoCredit(element.id, 'Money')}><img className='svg_buttons' src={money} alt="" /></button>}
                            </div>

                            <div className="data_credit">
                                <span className='credit_description'>{dayjs(element.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</span>
                            </div>

                            <div className="data_credit">
                                <span className='credit_description'>${Number(element.amount).toLocaleString('en-US')}</span>
                            </div>

                            <div className="data_credit historyC">
                                <span className='credit_description'>${Number(element.Installment).toLocaleString('en-US')}</span>
                                <button className='btnList' onClick={() => historyInstallment(element.id, element.id_customer, 'InstallmentHistory')}><img className='imgList' src={lisInstallment} /></button>
                            </div>

                            <div className="data_credit"><span className='credit_description'>${Number((Number(element.amount) - Number(element.Installment)).toFixed(2)).toLocaleString('en-US')}</span></div>

                            <div className="data_credit"><span className='credit_description'>{dayjs(element.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</span></div>

                            {element.status === "Activo" && <div className="data_credit"><span className='credit_description credit_status'>{element.status}</span></div>}

                            {element.status === "Pagado" && <div className="data_credit"><span className='credit_description credit_status_payout'>{element.status}</span></div>}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}