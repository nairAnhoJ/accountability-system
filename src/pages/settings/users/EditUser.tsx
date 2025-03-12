import { useState } from "react"
import IconRenderer from "../../../components/icons"
import { update } from "../../../services/usersService";

interface Data {
    id:number;
    id_number: string;
    name: string;
    email: string;
    phone: number;
    department_id: number;
    site_id: number;
}

interface Departments {
    id: number;
    name: string;
}

interface Sites {
    id: number;
    name: string;
}

const EditUser = ({ oldData, onClose, onSave, showNotif, departments, sites } : { oldData: Data; onClose: () => void; onSave: (data: Data) => void; showNotif: (message: string) => void; departments: Departments[]; sites: Sites[] }) => {
    const [data, setData] = useState<Data>({
        id: oldData.id,
        id_number: oldData.id_number,
        name: oldData.name,
        email: oldData.email,
        phone: oldData.phone,
        department_id: oldData.department_id,
        site_id: oldData.site_id,
    });

    const handleUpdate = async() => {
        setErrors([]);
        try {
            const response = await update(data, oldData.id) as { status: number; response: any; data: any;};

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
            <div className="bg-white dark:bg-gray-900 rounded w-[800px]">

                {/* Header */}
                <div className="p-4 font-bold text-lg border-b flex items-center justify-between h-14">
                    <span>EDIT USER</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={onClose}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-3">
                    <div className="w-full flex items-start gap-x-3">
                        {/* ID NUMBER */}
                        <div className="w-2/5">
                            <label className="block">ID Number</label>
                            <input onChange={(e) => setData({...data, id_number: e.target.value})} value={data.id_number} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                            {
                                errors.find((err) => err.path == "id_number") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "id_number")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* ID NUMBER */}

                        {/* EMPLOYEE NAME */}
                        <div className="w-3/5">
                            <label className="block">Name</label>
                            <input onChange={(e) => setData({...data, name: e.target.value})} value={data.name} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                            {
                                errors.find((err) => err.path == "name") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "name")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* EMPLOYEE NAME */}
                    </div>

                    <div className="w-full flex items-start gap-x-3">
                        {/* PHONE */}
                        <div className="w-2/5">
                            <label className="block">Phone</label>
                            <input onChange={(e) => setData({...data, phone: Number(e.target.value)})} value={data.phone} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                            {
                                errors.find((err) => err.path == "phone") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "phone")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* PHONE */}

                        {/* EMAIL */}
                        <div className="w-3/5">
                            <label className="block">Email</label>
                            <input onChange={(e) => setData({...data, email: e.target.value})} value={data.email} type="text" className='w-full px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                            {
                                errors.find((err) => err.path == "email") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "email")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* EMAIL */}
                    </div>

                    <div className="w-full flex items-start gap-x-3">
                        {/* DEPARTMENT */}
                        <div className="w-full">
                            <label className="block">Department</label>
                            <select onChange={(e) => {setData({...data, department_id: e.target.value ? Number(e.target.value) : 0})}} value={data.department_id} name='department_id' className='w-full border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                                <option hidden value="">Select an option</option>
                                {
                                    departments.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.find((err) => err.path == "department_id") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "department_id")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* DEPARTMENT */}

                        {/* SITE */}
                        <div className="w-full">
                            <label className="block">Sites</label>
                            <select onChange={(e) => {setData({...data, site_id: e.target.value ? Number(e.target.value) : 0})}} value={data.site_id} name='site_id' className='w-full border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                                <option hidden value="">Select an option</option>
                                {
                                    sites.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.find((err) => err.path == "site_id") ? (
                                    <p className='text-red-500 text-sm'>{ errors.find((err) => err.path == "site_id")?.msg }</p>
                                ) : null
                            }
                        </div>
                        {/* SITE */}
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

export default EditUser