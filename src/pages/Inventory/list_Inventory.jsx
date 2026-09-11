import plus from '../../assets/plus.svg'
import { cuteText } from '../../functions/methods';

export const ListInventory = ({ list, getionProduct }) => {

    return (
        <>
            <div className="titleAndNewProduct">
                <span className='title_section_inventory'>Inventario disponible</span>
                <button className="btn_new_product" title='Agregar un nuevo producto' onClick={() => document.getElementById('modal_new_product').showModal()}><img className='image_plus' src={plus} alt="" /></button>
            </div>
            
            <div className="container_inventory_items">

                <section className="description_items_inventory">
                    <div className="item_box_name_inventory">
                        <span className='name_section_product'>Articulo</span>
                    </div>
                    <div className="item_box_name_inventory">
                        <span className='name_section_product'>Codigo de barras</span>
                    </div>
                    <div className="item_box_name_inventory">
                        <span className='name_section_product'>stock</span>
                    </div>
                    <div className="item_box_name_inventory">
                        <span className='name_section_product'>categoria</span>
                    </div>
                    <div className="item_box_name_inventory">
                        <span className='name_section_product'>Accion</span>
                    </div>
                </section>

                <section className='container_list_products_inventory'>

                    <ul className='list_inventory_ul'>
                        {list.map((element, index) => {
                            return (
                                <li className='products_list_inventory' key={index}>
                                    <div className="img_inventory item_inv img_item_inv" title={element.nombre}>
                                        <img src={element.images} alt="" className='image_inventory' />
                                        <span>{cuteText(element.nombre)}</span>
                                    </div>
                                    <div className="img_inventory item_inv">

                                        <span>{element.codigo_barras}</span>
                                    </div>
                                    <div className="img_inventory item_inv">

                                        <span>{element.stock}</span>
                                    </div>
                                    <div className="img_inventory item_inv">

                                        <span>{element.categoria_ferreteria}</span>
                                    </div>
                                    <div className="img_inventory item_inv">
                                        <button className='gestion_product_btn' onClick={() => getionProduct({
                                            id: element.id,
                                            images: element.images,
                                            nombre: element.nombre,
                                            codigo_barras: element.codigo_barras,
                                            categoria_ferreteria: element.categoria_ferreteria,
                                            marca: element.marca,
                                            precio: element.precio,
                                            unidad_medida: element.unidad_medida,
                                            stock: element.stock,
                                            descripcion: element.descripcion
                                        })
                                        }>Gestionar Producto</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>



                </section>
            </div>
        </>
    )
}