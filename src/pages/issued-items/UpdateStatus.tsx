import { useState } from "react";
import icons from "../../components/icons"

interface Data {
    id: number;
    status: string;
    received_by: string;
    returned_date: string;
    remarks: string;
}

const UpdateStatus = ({data, updateStatusCloseButton, yesUpdateStatusButton}: { data: Data; updateStatusCloseButton: () => void; yesUpdateStatusButton: (statusUpdateData: Data) => void; }) => {

    const IconRenderer = ({name, className}: {name: string; className?: string}) => {
        const Icon = icons[name as keyof typeof icons];
        return Icon ? <Icon className={className} /> : null;
    }

    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 8);
    const [statusUpdateData, setStatusUpdateData] = useState<Data>({
        id: data.id,
        status: 'Returned',
        received_by: 'Ako',
        returned_date: currentDateTime.toISOString().slice(0, 16),
        remarks: data.remarks ? data.remarks : ""
    })

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[500px]">
                {/* Header */}
                <div className="p-4 font-bold text-xl border-b flex items-center justify-between h-14">
                    <span>Update Status</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button><IconRenderer name="edit" className="w-5 h-5 text-blue-500" /></button>
                        <span>|</span>
                        <button><IconRenderer name="delete" className="w-5 h-5 text-red-500" /></button>
                        <span>|</span>
                        <button onClick={updateStatusCloseButton}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>
                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-1">
                    <div className="mb-3">
                        <label className="block text-sm">Status <span className="text-red-500">*</span></label>
                        <select onChange={(e) => setStatusUpdateData({...statusUpdateData, status: e.target.value})} className="border text-center w-1/2 h-9 rounded border-gray-300 dark:bg-gray-100 dark:text-gray-600">
                            {/* <option value="Issued">Issued</option> */}
                            <option value="Returned">Returned</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                    {/* <div>
                        <label className="block text-sm">Received by</label>
                        <input type="text" value={statusUpdateData.received_by} onChange={(e) => setStatusUpdateData({...statusUpdateData, received_by: e.target.value})} className="w-full border px-3 py-1 rounded border-gray-300"/>
                    </div> */}
                    <div className="mb-3">
                        <label className="block text-sm">Returned Date / Reported Date (<span className="italic">If lost</span>)</label>
                        <input type="datetime-local" value={statusUpdateData.returned_date} onChange={(e) => setStatusUpdateData({...statusUpdateData, returned_date: e.target.value})} className="w-full border px-3 h-9 rounded border-gray-300 dark:bg-gray-100 dark:text-gray-600"/>
                    </div>
                    <div>
                        <label className="block text-sm">Remarks</label>
                        <input type="text" value={statusUpdateData.remarks} onChange={(e) => setStatusUpdateData({...statusUpdateData, remarks: e.target.value})} className="w-full border px-3 h-9 rounded border-gray-300 dark:bg-gray-100 dark:text-gray-600"/>
                    </div>
                </div>
                {/* Footer */}
                <div className="p-4">
                    <button onClick={() => yesUpdateStatusButton(statusUpdateData)} className="py-2 w-20 rounded bg-blue-500 text-white font-bold text-sm">Update</button>
                    <button onClick={updateStatusCloseButton} className="py-2 w-20 ml-3 rounded border font-bold text-sm">Close</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateStatus