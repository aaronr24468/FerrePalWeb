import dayjs from "dayjs"
import { useRef } from "react"
import ferrepalCharacter from '../../assets/ferrepalCharacter.png';
import barCode from '../../assets/barcode.svg'
import moneyP from '../../assets/moneyProduct.svg'
import mark from '../../assets/mark.svg'
import box from '../../assets/box.svg'
import add from '../../assets/package.gif'

export const InfoCredit = ({ selectModal,
    credit,
    loading,
    editCredit,
    setAmount,
    setDescription,
    installmentCredit,
    payoutCredit,
    createNewCredit,
    installmentH,
    getProductNewCredit,
    productsList,
    add_Product_credit_box,
    listSelected,
    unit_of_measurement
}) => {

    const textareaRef = useRef();
    const textareaNewCredit = useRef();
    const amountCredit = useRef();


    return (
        <dialog id="info_credit" >


            {selectModal === "Info" && !loading && <div className="info_credit_Container">
                {!loading && <div className="info_credit_customer">
                    {credit.status === "Activo" && <p className="data_credit"><span className="description_info">Status </span>{credit.status}</p>}
                </div>}
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Monto total </span>${Number(credit.amount).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.amount) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                <div className="info_credit_customer_edit description_edit"><span className="amount_edit">Descripción</span> <textarea readOnly type="text" defaultValue={credit.description} className="info_description_edit none_edit" ref={textareaRef} /></div>
            </div>}


            {selectModal === "Edit" && !loading && <div className="info_credit_Container">
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


            {selectModal === "Money" && !loading && <div className="money_credit_Container">
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
                    {/* <div className="credit_total_amount">
                        <span className="credit_amount_title">Total a pagar:</span>
                        <input type="text" placeholder="$0.00" className="input_amount_data" id="input_amount_data" ref={amountCredit} />
                    </div>
                    <textarea name="" id="input_description" className="input_description" placeholder="Descripcion de lo vendido">

                    </textarea>
                    <button className="btn_create_credit" onClick={() => createNewCredit(textareaNewCredit, amountCredit)}>Crear credito</button> */}

                    <h2>Nuevo credito</h2>

                    <div className="select_Product" >
                        <button autoFocus className="close_focus">x</button>

                        <input type="text" placeholder="Codigo de Barras" className="search_by_code" onClick={getProductNewCredit} />

                        <ul className="list_products_select_credit" id="list_products_select_credit">
                            {productsList.map((element, index) => {

                                return (
                                    <>
                                        {loading ?
                                            <li className="list_product_BD_loading" key={index}>
                                                <img src={ferrepalCharacter} className="loading_product_logo" />
                                            </li>
                                            :
                                            <li className="list_product_BD" key={index}>
                                                <div className="image_product_list">

                                                    <img src={element.images[0]} className="img_product_list_select" />

                                                    <div className="info">
                                                        <div className="desItem">
                                                            <span className="name_product">{element.nombre}</span>
                                                        </div>
                                                        <div className="desItem" title="Codigo de barras">
                                                            <img src={barCode} className="img_Desc" />
                                                            <span>{element.codigo_barras}</span>
                                                        </div>
                                                        <div className="desItem" title="Precio del producto">
                                                            <img src={moneyP} className="img_Desc" />
                                                            <span>{element.precio}</span>
                                                        </div>
                                                        <div className="desItem" title="Marca del producto">
                                                            <img src={mark} className="img_Desc" />
                                                            <span>{element.marca}</span>
                                                        </div>
                                                        <div className="desItem" title="stock">
                                                            <img src={box} className="img_Desc" />
                                                            <span>{element.stock}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="add_list_item">
                                                    <div className="addProductCredit">
                                                        <button className="addItemCredit" onClick={() => {
                                                            add_Product_credit_box({
                                                                id_product: element.id,
                                                                nombre: `${element.nombre}`,
                                                                image: `${element.images[0]}`,
                                                                codigo_barras: `${element.codigo_barras}`,
                                                                precio: element.precio,
                                                                marca: `${element.marca}`,
                                                                stock: element.stock,
                                                                unidad_medida: element.unidad_medida,
                                                                quantity: 1
                                                            })
                                                        }}>
                                                            <span className="title_btn">Agregar</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        }

                                    </>


                                )

                            })}
                        </ul>
                    </div>

                    <div className="products_Selected">
                        {listSelected.map((element, index) => {
                            return (
                                <>
                                    <div className="container_selected_product">

                                        <div className="container_info_product_selected">

                                            <img className="product_image_selected" src={element.image} />


                                            <div className="desciption_product">
                                                <div className="info_product_description">
                                                    <span>{element.nombre}</span>
                                                </div>
                                                <div className="info_product_description">
                                                    <img src={barCode} className="info_Desc" />
                                                    <span >{element.codigo_barras}</span>
                                                </div>
                                                <div className="info_product_description">
                                                    <img src={mark} className="info_Desc" />
                                                    <span >{element.marca}</span>
                                                </div>
                                                <div className="info_product_description">
                                                    <img src={moneyP} className="info_Desc" />
                                                    <span >{element.precio}</span>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="container_selector_medida">
                                            
                                            <div className="select_medida">
                                                <span>kg</span>
                                                <input type="checkbox" onChange={unit_of_measurement} id={element.id_product}/>
                                            </div>

                                            {element.unidad_medida === "pieza" && <div className="quantity_product">
                                                <button className="btn_quantity" onClick={() => {
                                                    const valueQ = document.getElementById("quantity").value;
                                                    if (valueQ > 1) {
                                                        const number = Number(valueQ) - 1;
                                                        document.getElementById("quantity").value = String(number)
                                                    }
                                                }}>-</button>

                                                <input type="text" defaultValue='1' className="quantity_product" id="quantity" />

                                                <button className="btn_quantity" onClick={() => {
                                                    const valueQ = document.getElementById("quantity").value;
                                                    const number = Number(valueQ) + 1;
                                                    document.getElementById("quantity").value = String(number)
                                                }}>+</button>

                                            </div>}


                                            {element.unidad_medida === "kg" && <div className="quantity_product">

                                                {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}

                                            </div>}
                                        </div>



                                    </div>
                                </>
                            )
                        })}
                    </div>


                    <div className="total_credit">
                        <span className="amount_credit"><strong>Total:</strong> $0.00</span>
                        <button className="create_credit">Crear credito</button>
                    </div>
                </section>
            </div>}





            {selectModal === "InstallmentHistory" && !loading && <div className="installment_history_container">

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
            </div>}
        </dialog>
    )
}