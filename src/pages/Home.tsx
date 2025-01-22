import React, { useEffect, useState } from 'react'
import icons from '../components/icons';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { getAll } from '../services/issuedItemService';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    // Icon Renderer
    const IconRenderer = ({ name, className }) => {
        const Icon = icons[name];
        return Icon ? <Icon className={className} /> : null;
    }

    // Type of the Object
    type Item = {
        id: number;
        issued_to: string;
        department_name: string;
        site_name: string;
        item_name: string;
        description: string;
        quantity: number;
        status: string;
        issued_by: string;
        issued_date: Date;
        received_by: string;
        returned_date: Date;
    };

    // const [showFilter, setShowFilter] = useState(false);
    const [collection, setCollection] = useState<Item[]>([]);
    const [sort, setSort] = useState('emp-asc');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    
    const getCollection = async() => {
        try {
            const response = await getAll();
            setPage(response.pagination.page);
            setCollection(response.collection);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // navigate(`/?sort=${sort}&search=${search}&page=1&perPage=${perPage}`, { replace: true })
        getCollection();
    }, [])

    const handleSort = (e) => {
        setSort(e.target.value)
        navigate(`/?sort=${e.target.value}&search=${search}&page=1&perPage=${perPage}`, { replace: true })
        getCollection();
    }

    const handleSearch = () => {
        navigate(`/?sort=${sort}&search=${search}&page=1&perPage=${perPage}`, { replace: true })
        getCollection();
    };

    const handleClearSearch = () => {
        setSearch('');
        navigate(`/?sort=${sort}&search=&page=1&perPage=${perPage}`, { replace: true })
        getCollection();
    };

    // FILTER
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    // const [filter, setFilter] = useState({
    //     department: '',
    //     start: null,
    //     end: null,
    // });

    // const showFilterToggle = () => {
    //     setShowFilter(!showFilter);
    // };

    // const handleIssuedDate = (date, name) => {
    //     setFilter((prev) => ({...prev, [name]: date}))
    // };

    // const handleIssuedDate = (date, name) => {
    //     setFilter({...filter, [name]: date})
    // };

    // const submitFilter = () => {

    //     setShowFilter(!showFilter);
    // }

    return (
        <>
            <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6'>
                {/* Controls */}
                <div>
                    <div className='w-full h-10 flex items-center justify-between mb-3'>
                        <div className='h-full'>
                            <button className='h-full bg-blue-500 px-3 text-white font-bold rounded flex items-center justify-center'>
                                <IconRenderer name={'add'} className='w-4 h-4'></IconRenderer> Add
                            </button>
                        </div>
                        <div className='flex items-center h-full gap-x-6 text-gray-500 dark:text-gray-300'>
                            <div className='h-full flex items-center gap-x-1 relative'>
                                <IconRenderer name={'search'} className='h-5 w-5 ml-2 absolute'></IconRenderer>
                                <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" className='h-full rounded w-80 border border-gray-300 pl-8 dark:bg-gray-800 dark:border-gray-500' />
                                <div className='absolute right-2 flex items-center gap-x-1'>
                                    <button onClick={handleClearSearch} className='font-bold text-red-500'><IconRenderer name={'close'} className='h-5 w-5'></IconRenderer></button>
                                    <button onClick={handleSearch} className='font-medium border border-gray-300 dark:border-gray-500 rounded px-1 tracking-tight'>Search</button>
                                </div>
                            </div>
                            <div className='h-full flex items-center gap-x-1'>
                                <span className='font-medium'>Sort by</span>
                                <select name="" id="" onChange={handleSort} className='font-medium border border-gray-300 rounded h-full min-w-32 px-1 dark:bg-gray-800 dark:border-gray-500 cursor-pointer'>
                                    <option value="emp-asc">Employee Name (A-Z)</option>
                                    <option value="emp-desc">Employee Name (Z-A)</option>
                                    <option value="date-asc">Date of Issuance (Newest First)</option>
                                    <option value="date-desc">Date of Issuance (Oldest First)</option>
                                </select>
                            </div>
                            {/* <button onClick={showFilterToggle} className='h-full flex items-center gap-x-1 border border-gray-300 rounded px-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-500'>
                                <IconFilter className='h-5 w-5'></IconFilter>
                                <span className='font-medium'>Filter</span>
                            </button> */}
                        </div>
                    </div>

                    {/* FILTER */}
                    {/* <div className={`w-full transition-all duration-300 mb-3 ${showFilter ? 'h-16 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                        <div className='w-full h-full flex text-gray-500 dark:text-gray-300 gap-x-10'>
                            <div className='h-full flex flex-col justify-center gap-x-1'>
                                <span className='font-medium'>Department</span>
                                <select name="" id="" className='font-medium border border-gray-300 rounded h-full min-w-32 px-1 dark:bg-gray-800 cursor-pointer dark:border-gray-500'>
                                    <option value="">All</option>
                                    <option value="">IT</option>
                                </select>
                            </div>
                            <div className='h-full flex flex-col justify-center gap-x-1'>
                                <span className='font-medium'>Date Issued</span>
                                <div className='flex items-center gap-x-2'>
                                    <DatePicker selected={filter.start} onChange={(date) => handleIssuedDate(date, 'start')} className='h-10 font-medium text-center w-32 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-500' />
                                    <span className='font-medium text-sm h-[1px] border-y w-3 border-gray-500 dark:border-gray-300'></span>
                                    <DatePicker selected={filter.end} onChange={(date) => handleIssuedDate(date, 'end')} className='h-10 font-medium text-center w-32 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-500' />
                                </div>
                            </div>
                            <div className='h-full flex flex-col justify-center gap-x-1'>
                                <span className='font-medium'>Status</span>
                                <select name="" id="" className='font-medium border border-gray-300 rounded h-full min-w-32 px-1 dark:bg-gray-800 cursor-pointer dark:border-gray-500'>
                                    <option value="">All</option>
                                    <option value="">Issued</option>
                                    <option value="">Returned</option>
                                    <option value="">Lost</option>
                                    <option value="">Damaged</option>
                                </select>
                            </div>
                            <div className='flex h-full items-end'>
                                <button onClick={submitFilter} className='bg-blue-500 text-white rounded h-10 w-32 font-medium'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Table */}
                <div className='w-full text-gray-500 dark:text-gray-400'>
                    <div className='w-full'>
                        <table className='w-full'>
                            <thead className='border-b border-gray-500 text-sm'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Employee Name</th>
                                    <th>Department</th>
                                    <th>Branch / Site</th>
                                    <th>Item Name</th>
                                    {/* <th>Item Description</th> */}
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    {/* <th>Date of Issuance</th> */}
                                    {/* <th>Issued By</th> */}
                                    {/* <th>Return Date</th> */}
                                    {/* <th>Recieved By</th> */}
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    collection.length > 0 ?
                                        collection.map((item, index) => (
                                            <tr key={index} className='font-semibold cursor-pointer border-b border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'>
                                                <td className='py-2 px-4'>{item.issued_to}</td>
                                                <td className='py-2 px-4 text-center'>{item.department_name}</td>
                                                <td className='py-2 px-4 text-center'>{item.site_name}</td>
                                                <td className='py-2 px-4 text-center'>{item.item_name}</td>
                                                {/* <td className='py-2 px-4 text-center'>{item.description}</td> */}
                                                <td className='py-2 px-4 text-center'>{item.quantity}</td>
                                                <td className='py-2 px-4 text-center'>{item.status}</td>
                                                {/* <td className='py-2 px-4 text-center'>EDIT | DELETE</td> */}
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
                </div>
            </div>
        </>
    )
}

export default Home