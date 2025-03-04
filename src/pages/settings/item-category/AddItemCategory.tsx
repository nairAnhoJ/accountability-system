import { useState } from "react"
import IconRenderer from "../../../components/icons"
import { create } from "../../../services/itemCategoryService";

interface Data {
    name: string;
}

const AddItemCategory = ({ onClose, onSave, showNotif } : { onClose: () => void; onSave: (data: Data) => void; showNotif: (message: string) => void }) => {
    const [data, setData] = useState<Data>({
        name: ''
    });

    const handleSubmit = async() => {
        setErrors([]);
        try {
            const response = await create(data) as { status: number; response: any; data: any;};
            console.log(response);
            
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
                    <span>NEW ITEM CATEGORY</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={onClose}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-1">
                    <div>
                        <label className="block">Category Name</label>
                        <input onChange={(e) => setData({...data, name: e.target.value})} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                        {
                            errors.find((err) => err.path == "name") ? (
                                <p className='text-red-500'>{ errors.find((err) => err.path == "name")?.msg }</p>
                            ) : null
                        }
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex gap-x-3">
                    <button onClick={handleSubmit} className="py-2 w-20 rounded bg-blue-500 text-white font-bold text-sm">SUBMIT</button>
                    <button onClick={onClose} className="py-2 w-20 rounded border font-bold text-sm">CLOSE</button>
                </div>

            </div>
        </div>
    )
}

export default AddItemCategory