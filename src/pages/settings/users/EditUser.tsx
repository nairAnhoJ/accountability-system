import { useState } from "react"
import IconRenderer from "../../../components/icons"
import { update } from "../../../services/itemsService";

interface Data {
    id: number;
    item_category_id: number;
    name: string;
}

interface ItemCategory {
    id: number;
    name: string;
}

const EditItem = ({ oldData, onClose, onSave, showNotif, itemCategoryOptions } : { oldData: Data; onClose: () => void; onSave: (data: Data) => void; showNotif: (message: string) => void; itemCategoryOptions: ItemCategory[] }) => {
    const [data, setData] = useState<Data>({
        id: oldData.id,
        item_category_id: oldData.item_category_id,
        name: oldData.name
    });

    const handleUpdate = async() => {
        setErrors([]);
        try {
            const response = await update(data, data.id) as { status: number; response: any; data: any;};

            if(response.status && response.status == 400){
                setErrors(response.response.data.errors);
            }
            
            if(response.status && response.status == 201){
                onSave(response.data.newItem);
                showNotif(response.data.message);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Errors
    type Errors = {
        path: string;
        msg: string;
    }
    const [errors, setErrors] = useState<Errors[]>([]);
    // Errors

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[500px]">

                {/* Header */}
                <div className="p-4 font-bold text-lg border-b flex items-center justify-between h-14">
                    <span>EDIT ITEM CATEGORY</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={onClose}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-3">
                    <div>
                        <label className="block">Category</label>
                        <select onChange={(e) => {setData({...data, item_category_id: e.target.value ? Number(e.target.value) : 0})}} value={data.item_category_id} name='item_category_id' className='w-full border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                            <option hidden value="">Select an Item</option>
                            {
                                itemCategoryOptions.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        {
                            errors.find((err) => err.path == "item_category_id") ? (
                                <p className='text-red-500'>{ errors.find((err) => err.path == "item_category_id")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div>
                        <label className="block">Item Name</label>
                        <input onChange={(e) => setData({...data, name: e.target.value})} value={data.name} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                        {
                            errors.find((err) => err.path == "name") ? (
                                <p className='text-red-500'>{ errors.find((err) => err.path == "name")?.msg }</p>
                            ) : null
                        }
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex gap-x-3">
                    <button onClick={handleUpdate} className="py-2 w-20 rounded bg-blue-500 text-white font-bold text-sm">UPDATE</button>
                    <button onClick={onClose} className="py-2 w-20 rounded border font-bold text-sm">CLOSE</button>
                </div>

            </div>
        </div>
    )
}

export default EditItem