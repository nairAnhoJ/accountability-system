import { Link } from "react-router-dom";
import IconRenderer from "../../components/icons"

interface Data {
    id: number;
    issued_to: string;
    department_name: string;
    site_name: string;
    item_name: string;
    description: string;
    quantity: number;
    remarks: string;

    status: string;
    issued_by: string;
    issued_date: string;

    received_by: string;
    returned_date: string;
}

const Show = ({data, showCloseButton, updateStatusButton, showDeleteButton}: {data:Data; showCloseButton: () => void; updateStatusButton: (data: Data) => void; showDeleteButton: () => void}) => {

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[800px]">


                {/* Header */}
                <div className="p-4 font-bold text-xl border-b flex items-center justify-end h-14">
                    {/* <span>Details</span> */}
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        {
                            data.status === "Issued" &&
                            <>
                                <Link to='/issued-items/edit' state={data}><IconRenderer name="edit" className="w-5 h-5 text-blue-500" /></Link>
                                <span>|</span>
                                <button onClick={showDeleteButton}><IconRenderer name="delete" className="w-5 h-5 text-red-500" /></button>
                                <span>|</span>
                            </>
                        }
                        <button onClick={showCloseButton}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>


                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-1">
                    <h1 className="font-bold text-lg">Item Details</h1>
                    <div className="flex items-center">
                        <h1 className="font-semibold text-sm w-1/4">Name:</h1>
                        <p className="font-bold text-base">{data.item_name}</p>
                    </div>
                    <div className="flex items-center">
                        <h1 className="font-semibold text-sm w-1/4">Description:</h1>
                        <p className="font-bold text-base">{data.description}</p>
                    </div>
                    <div className="flex items-center border-b pb-5">
                        <h1 className="font-semibold text-sm w-1/4">Quantity:</h1>
                        <p className="font-bold text-base">{data.quantity}</p>
                    </div>

                    <h1 className="font-bold text-lg mt-3">Employee Details</h1>
                    <div className="flex items-center">
                        <h1 className="font-semibold text-sm w-1/4">Name:</h1>
                        <p className="font-bold text-base">{data.issued_to}</p>
                    </div>
                    <div className="flex items-center">
                        <h1 className="font-semibold text-sm w-1/4">Department:</h1>
                        <p className="font-bold text-base">{data.department_name}</p>
                    </div>
                    <div className="flex items-center">
                        <h1 className="font-semibold text-sm w-1/4">Site:</h1>
                        <p className="font-bold text-base">{data.site_name}</p>
                    </div>
                    <div className="flex items-center border-b pb-5">
                        <h1 className="font-semibold text-sm w-1/4">Status:</h1>
                        <p className="font-bold text-base">{data.status}</p>
                    </div>


                    <h1 className="font-bold text-lg mt-3">Issue Details</h1>
                    <div className="flex flex-col">
                        <div className="flex items-center border-b pb-5">
                            <div className="w-1/2 flex items-center">
                                <h1 className="font-semibold text-sm w-1/2">Issued By:</h1>
                                <p className="font-bold text-base">{data.issued_by}</p>
                            </div>
                            <div className="w-1/2 flex items-center">
                                <h1 className="font-semibold text-sm w-1/3">Date:</h1>
                                <p className="font-bold text-base">{data.issued_date}</p>
                            </div>
                        </div>
                        {
                            (data.received_by && data.returned_date) &&
                            <>
                                <h1 className="font-bold text-lg mt-3">{data.status === "Returned" ? "Return Details" : "Report Details"}</h1>
                                <div className="flex items-center border-b pb-5">
                                    <div className="flex items-center w-1/2">
                                        <h1 className="font-semibold text-sm w-1/2">{data.status === "Returned" ? "Received By:" : "Reported To:"}</h1>
                                        <p className="font-bold text-base">{data.received_by}</p>
                                    </div>
                                    <div className="flex items-center w-1/2">
                                        <h1 className="font-semibold text-sm w-1/3">Date:</h1>
                                        <p className="font-bold text-base">{data.returned_date}</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className="mt-6">
                        <h1 className="font-semibold text-sm">Remarks</h1>
                        <p className="font-semibold text-base border rounded border-gray-400 px-2 py-1 h-[34px]">{data.remarks}</p>
                    </div>
                </div>


                {/* Footer */}
                <div className="p-4 flex gap-x-3">
                    {
                        data.status === "Issued" && <button onClick={() => updateStatusButton(data)} className="px-3 py-2 rounded bg-blue-500 text-white font-bold text-sm">Update Status</button>
                    }
                    <button onClick={showCloseButton} className="py-2 w-20 rounded border font-bold text-sm">Close</button>
                </div>


            </div>
        </div>
    )
}

export default Show