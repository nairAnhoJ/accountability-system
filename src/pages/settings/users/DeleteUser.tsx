import IconRenderer from "../../../components/icons"
import { deleteUser } from "../../../services/usersService";

interface Data {
    id: number;
    id_number: string;
    name: string;
    // email: string;
    // phone: number;
    // department_id: number;
    // department_name: string;
    // site_id: number;
    // site_name: string;
    // is_active: number;
}

const DeleteUser = ({ currentData, onClose, onSave, showNotif } : { currentData: Data; onClose: () => void; onSave: () => void; showNotif: (message: string) => void }) => {

    const handleDelete = async() => {
        try {
            const response = await deleteUser(currentData.id) as { status: number; response: any; data: any;};
            if(response.status && response.status == 201){
                onSave();
                showNotif(response.data.message);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[500px]">

                {/* Header */}
                <div className="p-4 font-bold text-lg border-b flex items-center justify-between h-14">
                    <span>DELETE USER</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={onClose}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-1">
                    <div>
                        <p className="mb-2">Are you sure you want to delete this user?</p>
                        
                        <h1 className="font-bold"><span className="text-sm font-normal">ID Number: </span>HII-{currentData.id_number}</h1>
                        <h1 className="font-bold"><span className="text-sm font-normal">Name: </span>{currentData.name}</h1>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex gap-x-3">
                    <button onClick={handleDelete} className="py-2 w-20 rounded bg-red-500 text-white font-bold text-sm">DELETE</button>
                    <button onClick={onClose} className="py-2 w-20 rounded border font-bold text-sm">CLOSE</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteUser