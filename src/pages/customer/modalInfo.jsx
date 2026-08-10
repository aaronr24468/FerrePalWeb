import dayjs from "dayjs"
import { useRef } from "react"

export const InfoCredit = ({ selectModal, credit, loading, editCredit, setAmount, setDescription, installmentCredit, payoutCredit, createNewCredit, installmentH }) => {
    const textareaRef = useRef();
    const textareaNewCredit = useRef();
    const amountCredit = useRef();

    return (
        <dialog id="info_credit" >


            {selectModal === "Info" && <div className="info_credit_Container">
                <div className="info_credit_customer">
                    {credit.status === "Activo" && <p className="data_credit"><span className="description_info">Status </span>{credit.status}</p>}
                </div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Monto total </span>${Number(credit.amount).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.amount) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                <div className="info_credit_customer_edit description_edit"><span className="amount_edit">Descripción</span> <textarea readOnly type="text" defaultValue={credit.description} className="info_description_edit none_edit" ref={textareaRef} /></div>
            </div>}


            {selectModal === "Edit" && <div className="info_credit_Container">
                {loading ? (
                    <>
                    </>
                ) : (
                    <>
                        <div className="info_credit_customer">
                            {credit.status === "Activo" && <p className="data_credit"><span className="description_info">Status </span>{credit.status}</p>}
                        </div>
                        <div className="info_credit_customer_edit"><span className="amount_edit">Monto total</span> <span className="current_amount">${Number(credit.amount).toLocaleString('en-US')}<input type="text" defaultValue={'+0.00'} className="amount_money" id="amount_money" onClick={(e) => e.target.value = ''} /></span></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.amount) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                        <div className="info_credit_customer_edit description_edit"><span className="amount_edit">Descripción</span> <textarea type="text" defaultValue={credit.description} className="info_description_edit" ref={textareaRef} /></div>

                        <div className="button_container_save">
                            <button className="edit_data_btn" onClick={() => editCredit(credit.id, textareaRef, credit.description)}>Guardar Cambios</button>
                        </div>
                    </>
                )}
            </div>}


            {selectModal === "Money" && <div className="money_credit_Container">
                <section className="boxPayment installment">
                    <span className="installment_span">Abonar</span>
                    <div className="abono_container_input">
                        <span>ingresa monto a abonar:</span>
                        <input type="text" placeholder="$0.00" className="installment_input" id="installment_input" />
                    </div>
                    <button className="installment_button" onClick={() => installmentCredit(credit.id, credit.id_customer)}>Confirmar Abono</button>

                    <p className="info_installment">El abono se sumara al saldo acumulado</p>
                </section>
                <section className="boxPayment payout">
                    <span className="payout_span">Liquidar</span>
                    <div className="payout_container">
                        <span className="payout_total">total a liquidar: </span>
                        <p className="total_amount">${Number((Number(credit.amount) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p>
                    </div>
                    <button className="payout_button" onClick={() => payoutCredit(credit.id, credit.id_customer)}>Liquidar</button>
                </section>
            </div>}


            {selectModal === "credit" && <div className="new_credit">
                <section className="new_credit_container">
                    <div className="credit_total_amount">
                        <span className="credit_amount_title">Total a pagar:</span>
                        <input type="text" placeholder="$0.00" className="input_amount_data" id="input_amount_data" ref={amountCredit} />
                    </div>
                    <textarea name="" id="input_description" className="input_description" placeholder="Descripcion de lo vendido">

                    </textarea>
                    <button className="btn_create_credit" onClick={() => createNewCredit(textareaNewCredit, amountCredit)}>Crear credito</button>
                </section>
            </div>}

            {selectModal === "InstallmentHistory" && <div className="installment_history_container">
                
                <span className="title_installment_span">Historial de Abonos</span>

                <section className="title_installment">
                    <span className="info_installment_title">fecha de Abono</span>
                    <span className="info_installment_title">Cantidad</span>
                    <span className="info_installment_title">Status</span>
                </section>
                <ul className="data_history_installment">
                    {installmentH.length === 0 && !loading?
                        (<div className="no_list">No existe historial</div>)
                        :
                        installmentH.map((element, index) => {
                        return (

                            <li key={index} className="container_data_installment">
                                <span className="data_credit_installment">{dayjs(element.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</span>
                                <span className="data_credit_installment amount_installment">${element.installment_amount}</span>
                                <span className="data_credit_installment ">
                                    {element.pay_status === "Abono" && <p className="intallment_status_tag">{element.pay_status}</p>}
                                    {element.pay_status === "Liquidado" && <p className="payout_status_tag">{element.pay_status}</p>}
                                </span>
                            </li>
                        )

                    })
                }
                    
                </ul>
            </div>}
        </dialog>
    )
}