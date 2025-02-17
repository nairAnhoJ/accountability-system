interface Columns {
    key: keyof Collection;
    label: string;
    className: string;
}

interface Collection {
    id: number;
    issued_to: string;
    description: string;
    quantity: number;
    status: string;
    remarks: string;
    issued_date: string;
    issued_by: string;
    returned_date: string;
    received_by: string;
    item_name: string;
    department_name: string;
    site_name: string;
}

const Table = ({ columns, collection, onRowClick }: { columns: Columns[], collection: Collection[], onRowClick: (row: Collection) => void }) => {
  return (
    <div className="w-full">
        <table className='w-full'>
            <thead className='border-b rounded-t-lg bg-gray-300 dark:bg-gray-700 border-gray-500 text-sm'>
                <tr className="">
                    {
                        columns.map((row) => (
                            <th key={row.key} className={row.className}>{row.label}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    collection.length > 0 ?
                        collection.map((item, index) => (
                            <tr key={index} onClick={() => onRowClick(item)} className={`font-normal cursor-pointer border-b border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:border-gray-700 ${index%2 === 1 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
                                {
                                    columns.map((row, index) => (
                                        <td key={index} className={row.className}>{item[row.key]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    : 
                        <tr>
                            <th colSpan={7} className='py-2 px-4'>No data.</th>
                        </tr>
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table