import { useInventoryHook } from '../../hooks/inventoryHook';
import '../../styles/Inventory/inventoryStyle.css';
import { listInventoryFerrePal } from '../../services/listFilter';
import { ModalEditProduct } from './modalEditProduct';
import { ListInventory } from './list_Inventory';
import { NewProduct } from './modal_new_product';
import { cuteText } from '../../functions/methods';
export const InventoryComponent = ({ }) => {

    const {
        list,
        getionProduct,
        dataProduct,
        loading,
        setDataProduct,
        saveChanges,
        ImagesFile,
        tempImages,
        deleteImage,
        uploadNewProduct
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
                <ListInventory list={list} getionProduct={getionProduct}/>
            </div>

            <dialog className='modal_inventory' id='modal_inventory'>
                <ModalEditProduct setDataProduct={setDataProduct} dataProduct={dataProduct} saveChanges={saveChanges}/>
            </dialog>

            <dialog className='modal_new_product' id='modal_new_product'>
                <NewProduct ImagesFile={ImagesFile} tempImages={tempImages} deleteImage={deleteImage} uploadNewProduct={uploadNewProduct}/>
            </dialog>
        </main>
    )
}