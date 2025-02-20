import icons from "../../components/icons"

const Delete = ({deleteCloseButton, deleteButton}: {deleteCloseButton: () => void; deleteButton: () => void;}) => {
    const IconRenderer = ({name, className}: {name: string; className?: string}) => {
        const Icon = icons[name as keyof typeof icons];
        return Icon ? <Icon className={className} /> : null;
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[99] bg-gray-900/50 text-gray-600 dark:bg-gray-500/50 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-900 rounded w-[500px]">

                {/* Header */}
                <div className="p-4 font-bold text-lg border-b flex items-center justify-between h-14">
                    <span>Delete Issued Item</span>
                    <div className="flex items-center text-lg leading-[18px] h-5 gap-x-2">
                        <button onClick={deleteCloseButton}><IconRenderer name="close" className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 border-b flex flex-col gap-y-1">
                    <h1 className="font-bold text-lg">Are you sure you want to delete this?</h1>
                </div>

                {/* Footer */}
                <div className="p-4 flex gap-x-3"><button onClick={deleteButton} className="px-3 py-2 rounded bg-red-500 text-white font-bold text-sm">Delete</button>
                    <button onClick={deleteCloseButton} className="py-2 w-20 rounded border font-bold text-sm">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Delete