
export const ModalEditProduct = ({ setDataProduct, dataProduct, saveChanges }) => {

    return (
        <>
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
        </>
    )
}