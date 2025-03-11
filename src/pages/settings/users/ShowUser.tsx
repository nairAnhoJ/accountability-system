// import { useState } from "react"
import IconRenderer from "../../../components/icons"

interface Data {
    id_number: string;
    name: string;
    email: string;
    phone: number;
    department_name: string;
    site_name: string;
    is_active: number;
}

const ShowUser = ({ onClose, data } : { onClose: () => void; data: Data }) => {


    // const handleSubmit = async() => {
    //     setErrors([]);
    //     try {
    //         const response = await create(data) as { status: number; response: any; data: any;};
            
    //         if(response.status && response.status == 400){
    //             setErrors(response.response.data.errors);
    //         }
            
    //         if(response.status && response.status == 201){
    //             onSave(response.data.newItem);
    //             showNotif(response.data.message);
    //             onClose();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const handleStatusChange = () => {
        
    // }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[500px]">

                {/* Header */}
                <div className="p-4 font-bold text-lg border-b flex items-center justify-between h-14">
                    <span>User Details</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={onClose}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-3">
                    <div>
                        <p className="text-sm leading-[8px]">ID Number</p>
                        <p className="text-lg font-semibold">{data.id_number}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">Name</p>
                        <p className="text-lg font-semibold">{data.name}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">Department</p>
                        <p className="text-lg font-semibold">{data.department_name}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">Site</p>
                        <p className="text-lg font-semibold">{data.site_name}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">E-mail Address</p>
                        <p className="text-lg font-semibold">{data.email}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">Phone</p>
                        <p className="text-lg font-semibold">{data.phone}</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[8px]">Status</p>
                        <p className={`text-lg font-semibold ${data.is_active === 1 ? 'text-green-500' : 'text-red-500'}`}>{data.is_active === 1 ? 'ACTIVE' : 'INACTIVE'}</p>
                    </div>
                    
                </div>

                {/* Footer */}
                <div className="p-4 flex gap-x-3">
                    {/* <button onClick={handleStatusChange} className="py-2 w-28 rounded bg-blue-500 text-white font-bold text-sm">{data.is_active === 1 ? 'DEACTIVATE' : 'REACTIVATE'}</button> */}
                    <button onClick={onClose} className="py-2 w-20 rounded border font-bold text-sm">CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default ShowUser