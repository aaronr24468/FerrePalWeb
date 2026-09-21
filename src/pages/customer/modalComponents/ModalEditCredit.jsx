import { cuteText } from "../../../functions/methods";
import dayjs from "dayjs";
import ferrepalCharacter from '../../../assets/ferrepalCharacter.png';
import barCode from '../../../assets/barcode.svg'
import moneyP from '../../../assets/moneyProduct.svg'
import mark from '../../../assets/mark.svg'
import box from '../../../assets/box.svg'

export const ModalEditCredit = ({
    credit,
    getProductEditCredit,
    add_Product_edit_box,
    productsListEdit,
    productsCreditEdit,
    more_less_unite_edit,
    set_Kilograms_quantity_edit,
    editCredit,
    totalCreditEdit,
    deleteProductEditCredit,
    editListCredit,
    showProducts,
    showListCredit,
    deleteProductCreditCustomer,
    customer,
    deleteCredit
}) => {

    console.log(customer)

    return (
        <>
            <div className="info_credit_customer">
                {credit.status === "Activo" && <p className="data_credit"><span className="description_info">Status </span>{credit.status}</p>}
            </div>
            <div className="info_credit_customer_edit"><span className="amount_edit">Monto total</span> <span className="current_amount">${Number(credit.total_credit).toLocaleString('en-US')}</span></div>
            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Saldo pendiente </span>${Number((Number(credit.total_credit) - Number(credit.Installment)).toFixed(2)).toLocaleString('en-US')}</p></div>
            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Total abonado </span>${Number(credit.Installment).toLocaleString('en-US')}</p></div>
            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de inicio </span>{dayjs(credit.create_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>
            <div className="info_credit_customer"><p className="data_credit"><span className="description_info">Fecha de ultimo cambio</span>{dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p></div>

            {/* Agregar productos */}
            <div className="info_credit_customer_edit description_edit">
                <div className="input_bar_code_name">

                    <div className="inputContainerSearch">
                        <input
                            type="text"
                            className="filter_product_by"
                            id="filter_product_by"
                            placeholder="Codigo de barras o Nombre"
                            onClick={() => { document.getElementById('products_inventory_edit')?.style.setProperty('display', 'block'), getProductEditCredit() }}
                            onChange={(event) => getProductEditCredit(event.target.value)}
                        />

                        <button className="edit_credit_Customer" id="edit_credit_Customer" onClick={editListCredit}>Edit credit</button>
                    </div>



                    <div className="products_inventory_edit" id="products_inventory_edit">
                        <div className="products_inventory_edit_container">

                            <button
                                className="close_products_inventory"
                                onClick={() => document.getElementById('products_inventory_edit')?.style.setProperty('display', 'none')}
                            >x</button>

                            <ul className="list_container_edit">
                                {productsListEdit.map((element, index) => {
                                    return (
                                        <li key={index} className="item_container_edit">
                                            <div className="image_data_container" title={element.nombre}>
                                                <img src={element.images} alt="" className="img_edit_credit" />
                                                <div className="edit_description_edit_product">

                                                    <div className="edit_description_data_product">
                                                        <p className="nombre_product_edit">{cuteText(element.nombre)}</p>
                                                    </div>
                                                    <div className="edit_description_data_product">
                                                        <img src={barCode} alt="" className="img_edit_credit" />
                                                        <span>{element.codigo_barras}</span>
                                                    </div>
                                                    <div className="edit_description_data_product">
                                                        <img src={moneyP} alt="" className="img_edit_credit" />
                                                        <span>{element.precio}</span>
                                                    </div>
                                                    <div className="edit_description_data_product">
                                                        <img src={mark} alt="" className="img_edit_credit" />
                                                        <span>{element.marca}</span>
                                                    </div>
                                                    <div className="edit_description_data_product">
                                                        <img src={box} alt="" className="img_edit_credit" />
                                                        <span>{element.stock}</span>
                                                    </div>

                                                </div>
                                            </div>

                                            <button className="add_new_item_edit" onClick={() => {
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

                    {showListCredit === false ?

                        productsCreditEdit.map((element, index) => {
                            return (
                                <li key={index} className="list_credit_edit">

                                    <button className="delete_product_list" onClick={() => deleteProductEditCredit(element.id_product)}>Eliminar</button>

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
                        })

                        :

                        showProducts.map((element, index) => {
                            return (
                                <li key={index} className="list_credit_edit">

                                    <button className="delete_product_list" onClick={() => deleteProductCreditCustomer(element.id, element.quantity, element.buy_price, credit.total_credit, credit.id, customer.id)}>Eliminar</button>

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
                                                <span>{element.buy_price}</span>
                                            </div>
                                        </div>

                                    </div>



                                    <div className="container_selector_medida_edit">

                                        {element.unidad_medida === "pieza" && <div className="quantity_product_edit">
                                            <span>Total de piezas</span>
                                            <input type="text" value={element.quantity} readOnly className="quantity_product_edit_input" id="quantity" />

                                        </div>}


                                        {element.unidad_medida === "kg" && <div className="quantity_product_edit">

                                            {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                            <div className="container_kilograms_metro">
                                                <span className="sale_unite">unidad en kilos</span>
                                                <input type="text" id={element.id_product} readOnly className="quantity_kilograms_edit" placeholder="0.00kg" min="0.01" step="0.01" onChange={set_Kilograms_quantity_edit} defaultValue={element.quantity} />
                                            </div>


                                        </div>}

                                        {element.unidad_medida === "metro" && <div className="quantity_product_edit">

                                            {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                            <div className="container_kilograms_metro">
                                                <span className="sale_unite">unidad en metros</span>
                                                <input type="text" id={element.id_product} readOnly className="quantity_kilograms_edit" placeholder="0.0m" min="0.01" step="0.01" onChange={set_Kilograms_quantity_edit} defaultValue={element.quantity} />
                                            </div>

                                        </div>}

                                    </div>

                                </li>
                            )
                        })
                    }

                </ul>
            </div>

            <div className="button_container_save" id="button_container_save">
                <span className="new_total" id="new_total">Total nuevo: ${(Number(totalCreditEdit) + Number(credit.total_credit)).toLocaleString('en-US')} </span>
                <button className="edit_data_btn" id="edit_data_btn" onClick={() => editCredit(credit.id, totalCreditEdit, credit.total_credit)}>Guardar Cambios</button>
            </div>

            <div className="container_delete_credit" id="container_delete_credit">
                <button className="delete_credit" onClick={() => deleteCredit(credit.id)}>Eliminar credito</button>
            </div>



        </>
    )
}