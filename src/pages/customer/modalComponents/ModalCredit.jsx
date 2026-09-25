import dayjs from "dayjs"
import ferrepalCharacter from '../../../assets/ferrepalCharacter.png';
import barCode from '../../../assets/barcode.svg'
import moneyP from '../../../assets/moneyProduct.svg'
import mark from '../../../assets/mark.svg'
import box from '../../../assets/box.svg'
import { cuteText } from "../../../functions/methods";

export const ModalCreateCredit = ({
    getProductNewCredit,
    productsList,
    add_Product_credit_box,
    listSelected,
    more_less_unite,
    set_Kilograms_quantity,
    totalCredit,
    createNewCredit,
    loading,
    deleteProductNewCredit,
    loadingModal
}) => {

    return (
        <>
            <h2>Nuevo credito</h2>

            <div className="select_Product" >
                <button autoFocus className="close_focus">x</button>

                <input type="text" placeholder="Codigo de Barras o Nombre" className="search_by_code" onClick={getProductNewCredit} onChange={(event) => getProductNewCredit(event.target.value)} />

                <ul className="list_products_select_credit" id="list_products_select_credit">
                    {loadingModal ?
                        <>
                            <div className="loading_logo">
                                <img src={ferrepalCharacter} alt="" className="loading_img_character" />
                            </div>
                        </>
                        :
                        <>
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
                        </>
                    }

                </ul>
            </div>

            <div className="products_Selected">
                {listSelected.map((element, index) => {
                    return (

                        <div className="container_selected_product" key={index}>



                            <div className="container_info_product_selected" title={element.nombre}>

                                <button className="Delete_product_selected" onClick={() => deleteProductNewCredit(element.id_product)}>Eliminar</button>

                                <img className="product_image_selected" src={element.image} />


                                <div className="desciption_product">
                                    <div className="info_product_description">
                                        <span>{cuteText(element.nombre)}</span>
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

                                    <input type="text" value={element.quantity} readOnly className="quantity_product_pieza" id="quantity" />

                                    <button className="btn_quantity" id={element.id_product} quantity="true" onClick={more_less_unite}>+</button>

                                </div>}


                                {element.unidad_medida === "kg" && <div className="quantity_product">

                                    <span>unidad en kilogramos</span>

                                    {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                    <input type="text" id={element.id_product} className="quantity_kilograms" placeholder="0.00kg" min="0.01" step="0.01" onChange={set_Kilograms_quantity} />

                                </div>}

                                {element.unidad_medida === "metro" && <div className="quantity_product meters_kilo">


                                    <span>unidad en metros</span>

                                    {/* aqui va a ir para los kilogramos, productos que se vendan a granel */}
                                    <input type="text" id={element.id_product} className="quantity_kilograms" placeholder="0.0m" min="0.01" step="0.01" onChange={set_Kilograms_quantity} defaultValue={element.quantity} />

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
        </>
    )
}