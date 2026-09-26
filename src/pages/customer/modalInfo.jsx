import dayjs from "dayjs"
import { useRef } from "react"
import ferrepalCharacter from '../../assets/ferrepalCharacter.png';
import barCode from '../../assets/barcode.svg'
import moneyP from '../../assets/moneyProduct.svg'
import mark from '../../assets/mark.svg'
import box from '../../assets/box.svg'
import add from '../../assets/package.gif'
import { cuteText } from "../../functions/methods";
import { ModalEditCredit } from "./modalComponents/ModalEditCredit";
import { ModalCreateCredit } from "./modalComponents/ModalCredit";

export const InfoCredit = ({ selectModal,
    credit,
    loading,
    editCredit,
    installmentCredit,
    payoutCredit,
    createNewCredit,
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
    customer,
    deleteCredit,
    loadingModal
}) => {

    const textareaRef = useRef();

    const arrayProducts = credit.list_products.split(',')

    console.log(loadingModal)

    return (
        <dialog id="info_credit" >

            <div className="general_container_modal">
                {selectModal === "Info" && <div className="info_credit_Container">
                    {loadingModal ?
                        <>
                            <div className="loading_logo">
                                <img src={ferrepalCharacter} alt="" className="loading_img_character" />
                            </div>
                        </>

                        :
                        <>
                            <div className="info_credit_customer">
                                <p className="data_credit"><span className="description_info">Status </span>{credit.status}</p>
                            </div>
                            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Monto total </span>${Number(credit.total_credit).toLocaleString('en-US')}</p></div>
                            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.total_credit) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
                            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
                            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                            <div className="info_credit_customer_edit description_edit">
                                <ul className="info_description_edit none_edit">
                                    {showProducts.map((element, index) => {
                                        return (
                                            <li className="prod_list_credit" key={index}>
                                                <img src={element.images} className="image_show_product" />
                                                <span>{cuteText(element.nombre)}</span>
                                                <span>{`(${element.quantity} ${element.unidad_medida})`}</span>
                                                <span>---------------${Number(element.buy_price) * Number(element.quantity)}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </>

                    }
                </div>}


                {selectModal === "Edit" && <div className="info_credit_Container">
                    {loadingModal ? (
                        <>
                            <div className="loading_logo">
                                <img src={ferrepalCharacter} alt="" className="loading_img_character" />
                            </div>
                        </>
                    ) : (
                        <>

                            <ModalEditCredit
                                credit={credit}
                                getProductEditCredit={getProductEditCredit}
                                add_Product_edit_box={add_Product_edit_box}
                                productsListEdit={productsListEdit}
                                productsCreditEdit={productsCreditEdit}
                                more_less_unite_edit={more_less_unite_edit}
                                set_Kilograms_quantity_edit={set_Kilograms_quantity_edit}
                                editCredit={editCredit}
                                totalCreditEdit={totalCreditEdit}
                                deleteProductEditCredit={deleteProductEditCredit}
                                editListCredit={editListCredit}
                                showProducts={showProducts}
                                showListCredit={showListCredit}
                                deleteProductCreditCustomer={deleteProductCreditCustomer}
                                customer={customer}
                                deleteCredit={deleteCredit}
                                loadingModal={loadingModal}
                            />


                        </>
                    )}
                </div>}


                {selectModal === "Money" && <div className="money_credit_Container">
                    {loadingModal ?
                        <>
                            <div className="loading_logo">
                                <img src={ferrepalCharacter} alt="" className="loading_img_character" />
                            </div>
                        </>
                        :
                        <>
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
                                    <p className="total_amount">${Number((Number(credit.total_credit) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p>
                                </div>
                                <button className="payout_button" onClick={() => payoutCredit(credit.id, credit.id_customer)}>Liquidar</button>
                            </section>
                        </>
                    }

                </div>}





                {selectModal === "credit" && <div className="new_credit">
                    <section className="new_credit_container">

                        <ModalCreateCredit
                            getProductNewCredit={getProductNewCredit}
                            productsList={productsList}
                            add_Product_credit_box={add_Product_credit_box}
                            listSelected={listSelected}
                            more_less_unite={more_less_unite}
                            set_Kilograms_quantity={set_Kilograms_quantity}
                            totalCredit={totalCredit}
                            createNewCredit={createNewCredit}
                            loading={loading}
                            deleteProductNewCredit={deleteProductNewCredit}
                            loadingModal={loadingModal}
                        />


                    </section>
                </div>}





                {selectModal === "InstallmentHistory" && !loading && <div className="installment_history_container">

                    {loadingModal ?
                        <>
                            <div className="loading_logo">
                                <img src={ferrepalCharacter} alt="" className="loading_img_character" />
                            </div>
                        </>
                        :
                        <>
                            <span className="title_installment_span">Historial de Abonos</span>

                            <section className="title_installment">
                                <span className="info_installment_title">fecha de Abono</span>
                                <span className="info_installment_title">Cantidad</span>
                                <span className="info_installment_title">Status</span>
                            </section>
                            <ul className="data_history_installment">
                                {installmentH.length === 0 && !loading ?
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
                        </>
                    }


                </div>}
            </div>



        </dialog>
    )
}