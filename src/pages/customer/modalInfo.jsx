import dayjs from "dayjs"
import { useRef } from "react"
import ferrepalCharacter from '../../assets/ferrepalCharacter.png';
import barCode from '../../assets/barcode.svg'
import moneyP from '../../assets/moneyProduct.svg'
import mark from '../../assets/mark.svg'
import box from '../../assets/box.svg'
import add from '../../assets/package.gif'
import { cuteText } from "../../functions/methods";

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
    add_Product_edit_box
}) => {

    const textareaRef = useRef();

    const arrayProducts = credit.list_products.split(',')

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
                <div className="info_credit_customer_edit description_edit">
                    <span className="amount_edit">Descripción</span>
                    <ul className="info_description_edit none_edit">
                        {arrayProducts.map((element) => {
                            return (
                                <li className="prod_list_credit">
                                    <p>{element}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
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
                        <div className="info_credit_customer_edit"><span className="amount_edit">Monto total</span> <span className="current_amount">${Number(totalCreditEdit).toLocaleString('en-US')}</span></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.amount) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
                        <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>

                        {/* Agregar productos */}
                        <div className="info_credit_customer_edit description_edit">
                            <div className="input_bar_code_name">
                                <input
                                    type="text"
                                    className="filter_product_by"
                                    placeholder="Codigo de barras o Nombre"
                                    onClick={() => {document.getElementById('products_inventory_edit')?.style.setProperty('display', 'block'), getProductEditCredit()}}
                                    onChange={(event) => getProductEditCredit(event.target.value)}
                                />

                                <div className="products_inventory_edit" id="products_inventory_edit">
                                    <div className="products_inventory_edit_container">

                                        <button
                                            className="close_products_inventory"
                                            onClick={() => document.getElementById('products_inventory_edit')?.style.setProperty('display', 'none')}
                                        >x</button>

                                        <ul className="list_container_edit">
                                            {productsListEdit.map((element, index) =>{
                                                return(
                                                    <li key={index} className="item_container_edit">
                                                        <div className="image_data_container" title={element.nombre}>
                                                            <img src={element.images} alt="" className="img_edit_credit"/>
                                                            <div className="edit_description_edit_product">

                                                                <div className="edit_description_data_product">
                                                                    <p className="nombre_product_edit">{cuteText(element.nombre)}</p>
                                                                </div>
                                                                <div className="edit_description_data_product">
                                                                    <img src={barCode} alt=""  className="img_edit_credit"/>
                                                                    <span>{element.codigo_barras}</span>
                                                                </div>
                                                                <div className="edit_description_data_product">
                                                                    <img src={moneyP} alt=""  className="img_edit_credit"/>
                                                                    <span>{element.precio}</span>
                                                                </div>
                                                                <div className="edit_description_data_product">
                                                                    <img src={mark} alt=""  className="img_edit_credit"/>
                                                                    <span>{element.marca}</span>
                                                                </div>
                                                                <div className="edit_description_data_product">
                                                                    <img src={box} alt=""  className="img_edit_credit"/>
                                                                    <span>{element.stock}</span>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>

                                                        <button className="add_new_item_edit" onClick={() =>{
                                                            add_Product_edit_box({
                                                                id_product: element.id,
                                                                id_credit: element.id_credit,
                                                                nombre: `${element.nombre}`,
                                                                images: `${element.images}`,
                                                                codigo_barras: `${element.codigo_barras}`,
                                                                precio: element.precio,
                                                                marca: `${element.marca}`,
                                                                stock: element.stock,
                                                                unidad_medida: element.unidad_medida,
                                                                kg: '0.00',
                                                                quantity: 1
                                                            })
                                                        }}>Agregar</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <ul className="list_products_crerdit">
                                {productsCreditEdit.map((element, index) => {
                                    return (
                                        <li key={index} className="list_credit_edit">

                                            <div className="desc_product_edit_container" title={element.nombre}>
                                                <img src={element.images} className="img_credit_edit" />

                                                <div className="description_products_edit">
                                                    <div className="desc_products_edit">
                                                        <span>{cuteText(element.nombre)}</span>
                                                    </div>
                                                    <div className="desc_products_edit">
                                                        <img src={barCode} className="img_edit_desc" />
                                                        <span>{element.codigo_barras}</span>
                                                    </div>
                                                    <div className="desc_products_edit">
                                                        <img src={mark} className="img_edit_desc" />
                                                        <span>{element.marca}</span>
                                                    </div>
                                                    <div className="desc_products_edit">
                                                        <img src={moneyP} className="img_edit_desc" />
                                                        <span>{element.precio}</span>
                                                    </div>
                                                </div>

                                            </div>



                                            <div className="container_selector_medida_edit">

                                                {element.unidad_medida === "pieza" && <div className="quantity_product_edit">

                                                    <button className="btn_quantity_edit" id={element.id_product} quantity="false" defaultV={element.quantity} onClick={more_less_unite_edit}>-</button>

                                                    <input type="text" value={element.quantity} readOnly className="quantity_product_edit_input" id="quantity" />

                                                    <button className="btn_quantity_edit" id={element.id_product} quantity="true" onClick={more_less_unite_edit}>+</button>

                                                </div>}


                                                {element.unidad_medida === "kg" && <div className="quantity_product_edit">

                                                    {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                                    <div className="container_kilograms_metro">
                                                        <span className="sale_unite">unidad en kilos</span>
                                                        <input type="text" id={element.id_product} className="quantity_kilograms_edit" placeholder="0.00kg" min="0.01" step="0.01" onChange={set_Kilograms_quantity_edit} defaultValue={element.quantity} />
                                                    </div>


                                                </div>}

                                                {element.unidad_medida === "metro" && <div className="quantity_product_edit">

                                                    {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                                    <div className="container_kilograms_metro">
                                                        <span className="sale_unite">unidad en metros</span>
                                                        <input type="text" id={element.id_product} className="quantity_kilograms_edit" placeholder="0.0m" min="0.01" step="0.01" onChange={set_Kilograms_quantity_edit} defaultValue={element.quantity} />
                                                    </div>

                                                </div>}

                                            </div>

                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

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

                        <input type="text" placeholder="Codigo de Barras o Nombre" className="search_by_code" onClick={getProductNewCredit} onChange={(event) => getProductNewCredit(event.target.value)}/>

                        <ul className="list_products_select_credit" id="list_products_select_credit">
                            {productsList.map((element, index) => {

                                return (
                                    <li key={index} className="container_list_products">
                                        {loading ?
                                            <div className="list_product_BD_loading" >
                                                <img src={ferrepalCharacter} className="loading_product_logo" />
                                            </div>
                                            :
                                            <div className="list_product_BD">
                                                <div className="image_product_list">

                                                    <div className="container_image_list_roduct">
                                                        <img src={element.images} className="img_product_list_select" />
                                                    </div>

                                                    

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
                                                            // Al dar click mandamos a llamar este metodo el los customeHooks para agregar el producto
                                                            add_Product_credit_box({
                                                                id_product: element.id,
                                                                nombre: `${element.nombre}`,
                                                                image: `${element.images}`,
                                                                codigo_barras: `${element.codigo_barras}`,
                                                                precio: element.precio,
                                                                marca: `${element.marca}`,
                                                                stock: element.stock,
                                                                unidad_medida: element.unidad_medida,
                                                                kg: '0.00',
                                                                quantity: 1
                                                            })
                                                        }}>
                                                            <span className="title_btn">Agregar</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                )

                            })}
                        </ul>
                    </div>

                    <div className="products_Selected">
                        {listSelected.map((element, index) => {
                            return (

                                <div className="container_selected_product" key={index}>

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

                                        {/* <div className="select_medida">
                                                <span>kg</span>
                                                <input type="checkbox" id={element.id_product}/>
                                            </div> */}

                                        {element.unidad_medida === "pieza" && <div className="quantity_product">

                                            <button className="btn_quantity" id={element.id_product} quantity="false" onClick={more_less_unite}>-</button>

                                            <input type="text" value={element.quantity} readOnly className="quantity_product" id="quantity" />

                                            <button className="btn_quantity" id={element.id_product} quantity="true" onClick={more_less_unite}>+</button>

                                        </div>}


                                        {element.unidad_medida === "kg" && <div className="quantity_product">

                                            {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                            <input type="text" id={element.id_product} className="quantity_kilograms" placeholder="0.00kg" min="0.01" step="0.01" onChange={set_Kilograms_quantity} />

                                        </div>}

                                        {element.unidad_medida === "metro" && <div className="quantity_product">

                                            {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                            <input type="text" id={element.id_product} className="quantity_kilograms" placeholder="0.0m" min="0.01" step="0.01" onChange={set_Kilograms_quantity} defaultValue={element.quantity}/>

                                        </div>}
                                    </div>



                                </div>

                            )
                        })}
                    </div>


                    <div className="total_credit">
                        <span className="amount_credit"><strong>Total:</strong> ${Number(totalCredit).toLocaleString('en-US')}</span>
                        <button className="create_credit" onClick={createNewCredit}>Crear credito</button>
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