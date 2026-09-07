import { useInventoryHook } from '../../hooks/inventoryHook';
import '../../styles/Inventory/inventoryStyle.css';
import { listInventoryFerrePal } from '../../services/listFilter';
export const InventoryComponent = ({ }) => {

    const {
        list,
        getionProduct,
        cuteText,
        dataProduct,
        loading,
        setDataProduct,
        saveChanges
    } = useInventoryHook();


    return (
        <main className='main_Component_container'>

            <aside className='filtro'>
            
                <div className="inputSearch">
                    <a href="/FerrePal" className='route_direction_gestion'>Gestion de clientes</a>
                    <input type="text" className='search_inventory_item' placeholder='Busca por codigo de barras o nombre' />
                </div>
                <ul className='list_filter'>
                    {listInventoryFerrePal.map((element, index) => {
                        return (
                            <li className='filter_checkboxs' title={element} key={index}>
                                <span className='filter_name'>{cuteText(element)}</span>
                            </li>
                        )
                    })}

                </ul>
            </aside>

            <div className="Inventory_items">
                <span className='title_section_inventory'>Inventario disponible</span>
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
                                        <div className="img_inventory item_inv img_item_inv">
                                            <img src={element.images} alt="" className='image_inventory' />
                                            <span>{element.nombre}</span>
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
            </div>

            <dialog className='modal_inventory' id='modal_inventory'>

                <div className="gestion_product">
                    <button className="close_modal_inventory" onClick={() => document.getElementById('modal_inventory').close()}>x</button>
                    <div className="topDecription">
                        <div className="img_gestion_item">
                            <img className='img_product_gestion_view' src={dataProduct.images || null} alt="" />
                        </div>
                        <div className="first_data_product">
                            <div className="input_data_product">
                                <span className='data_name'>Nombre</span>
                                <input className='data_product_input' type="text" value={dataProduct.nombre} onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        nombre: event.target.value
                                    }))
                                }} />
                            </div>
                            <div className="input_data_product">
                                <span className='data_name'>Codigo de barras</span>
                                <input className='data_product_input' type="text" value={dataProduct.codigo_barras} onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        codigo_barras: event.target.value
                                    }))
                                }} />
                            </div>
                            <div className="input_data_product">
                                <span className='data_name'>Categoria ferreteria</span>
                                <input className='data_product_input' type="text" value={dataProduct.categoria_ferreteria} onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        categoria_ferreteria: event.target.value
                                    }))
                                }} />
                            </div>
                            <div className="input_data_product">
                                <span className='data_name'>Marca</span>
                                <input className='data_product_input' type="text" value={dataProduct.marca} onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        marca: event.target.value
                                    }))
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="data_product_bottom">
                        <div className="container_price_stock_unite">
                            <div className="box_data_item">
                                <span className='title_input'>Precio</span>
                                <input type="text" value={dataProduct.precio} className='input_data_bottom' onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        precio: event.target.value
                                    }))
                                }} />
                            </div>
                            <div className="box_data_item">
                                <span className='title_input'>Stock</span>
                                <input type="text" value={dataProduct.stock} className='input_data_bottom' onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        stock: event.target.value
                                    }))
                                }} />
                            </div>
                            <div className="box_data_item">
                                <span className='title_input'>Unidad de medida</span>
                                <input type="text" value={dataProduct.unidad_medida} className='input_data_bottom' onChange={(event) => {
                                    setDataProduct((prevItem) => ({
                                        ...prevItem,
                                        unidad_medida: event.target.value
                                    }))
                                }} />
                            </div>
                        </div>

                        <div className="text_description_container">
                            <textarea className='description_product' value={dataProduct.descripcion} onChange={(event) => {
                                setDataProduct((prevItem) => ({
                                    ...prevItem,
                                    descripcion: event.target.value
                                }))
                            }}></textarea>
                        </div>

                        <button className='btn_save_changes' onClick={() => saveChanges(dataProduct.id)}>Guardar cambios</button>
                    </div>
                </div>

            </dialog>
        </main>
    )
}