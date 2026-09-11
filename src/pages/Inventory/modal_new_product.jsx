import { listInventoryFerrePal, unidadMedida } from "../../services/listFilter";
import upload from '../../assets/upload.svg'
import trash from '../../assets/trash.svg'

export const NewProduct = ({ ImagesFile, tempImages, deleteImage, uploadNewProduct }) => {

    return (
        <>
            <div className="mainContainerNewProduct">
                <button className="close_modal_new_product" onClick={() => document.getElementById('modal_new_product').close()}>x</button>

                <div className="container_input_data_register_product">
                    <form onSubmit={uploadNewProduct} className="form_input_product">
                        <div className="inputs_options">
                            <div className="inputBox">
                                <span className="title_input_new_product">Nombre</span>
                                <input type="text" placeholder="Nombre" className="input_new_product" name="nombre"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Codigo de barras</span>
                                <input type="text" placeholder="Codigo de barras" className="input_new_product" name="codigo"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Categoria</span>
                                <input type="text" placeholder="Categoria" className="input_new_product" onMouseEnter={(event) => event.target.focus()} name="categoria"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Categoria Ferreteria</span>
                                <input type="text" placeholder="Categoria Ferreteria" className="input_new_product" list="ferre_caterogia" onMouseEnter={(event) => event.target.focus()} name="categoria_ferreteria"/>
                                <datalist id="ferre_caterogia">
                                    {listInventoryFerrePal.map((valueList, index) => {
                                        return (valueList != "Todos" && <option value={valueList} key={index}/>)
                                    })}
                                </datalist>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Marca</span>
                                <input type="text" placeholder="Marca" className="input_new_product" name="marca"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Precio</span>
                                <input type="text" placeholder="$Precio" className="input_new_product" name="precio"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Costo</span>
                                <input type="text" placeholder="$Costo" className="input_new_product" name="costo"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Stock</span>
                                <input type="text" placeholder="Stock" className="input_new_product" name="stock"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Stock minimo</span>
                                <input type="text" placeholder="Stock minimo" className="input_new_product" name="minStock"/>
                            </div>

                            <div className="inputBox">
                                <span className="title_input_new_product">Unidad de medida</span>
                                <input type="text" placeholder="Unidad de medida" className="input_new_product" list="unidad_medida_input" onMouseEnter={(event) => event.target.focus()} name="unidad"/>

                                <datalist id="unidad_medida_input">
                                    {unidadMedida.map((unidad, index) => {
                                        return (
                                            <option value={unidad} key={index}/>
                                        )
                                    })}
                                </datalist>
                            </div>
                        </div>

                        <div className="description_container_input">
                            <textarea name="descripcion" id="description_item" placeholder="Descripcion"></textarea>
                        </div>

                        <div className="select_images">
                            {tempImages.length === 0 ?
                                <>
                                    <label htmlFor="images_product" className="label_file_input"><img src={upload} alt="" className="img_upload" /></label>
                                    <input type="file" id="images_product" className="input_file_images" multiple onChange={ImagesFile} />
                                </>
                                :
                                <>
                                    {tempImages.map((img, index) =>{
                                        return(
                                            <div className="box_image" key={index}>
                                                <a className="delete_image" onClick={() => deleteImage(index)}><img className="trash_image" src={trash} alt="" /></a>
                                                <img className="img_product_selected" src={img} />
                                            </div>
                                            
                                        )
                                    })}
                                </>
                            }

                        </div>

                        <button type="submit" className="btn_submit_product">Agregar producto</button>

                    </form>
                </div>
            </div>
        </>
    )
}