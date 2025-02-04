import { useEffect, useState } from 'react'
import icons from '../components/icons';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { getAll } from '../services/issuedItemService';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';


function Home() {
    const navigate = useNavigate();

    // Icon Renderer
    const IconRenderer = ({ name, className } : { name: string; className?: string }) => {
        const Icon = icons[name as keyof typeof icons];
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
    const [sort, setSort] = useState('date-asc');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [pageArray, setPageArray] = useState<number[] >([]);

    const getCollection = async() => {
        try {
            const response = await getAll();
            setSearch(response.search);
            setSort(response.sort);
            setPage(response.pagination.page);
            setPerPage(response.pagination.perPage);
            setCollection(response.collection);
            setPageCount(response.pagination.pageCount);
            const pageValue = parseInt(response.pagination.page);
            const pageCountValue = parseInt(response.pagination.pageCount);
            if(pageCountValue < 6){
                var pageArrayToSet = [];
                for(var i = 1; i <= pageCountValue; i++){
                    pageArrayToSet.push(i);
                }
                setPageArray(pageArrayToSet);
            }else{
                if(pageValue > 3 && pageCountValue > 5){
                    if((pageCountValue-pageValue) < 2){
                        setPageArray([
                            (pageCountValue-4),
                            (pageCountValue-3),
                            (pageCountValue-2),
                            (pageCountValue-1),
                            pageCountValue
                        ]);
                    }else{
                        setPageArray([
                            (pageValue-2),
                            (pageValue-1),
                            pageValue,
                            (pageValue+1),
                            (pageValue+2)
                        ]);
                    }
                }else{
                    setPageArray([1,2,3,4,5]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCollection();
    }, []);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
        let url = `?sort=${e.target.value}`;
        if(search != ''){
            url += `&search=${search}`;
        }
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

    const handleSearch = () => {
        let url = `?sort=${sort}&search=${search}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    };

    const handleClearSearch = () => {
        setSearch('');

        let url = `?sort=${sort}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    };

    const handlePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerPage(Number(e.target.value));
        
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&perPage=${e.target.value}`;
        navigate(url, { replace: true });
        getCollection();
    }

    const handlePageClick = (page: number) => {
        setPage(page);
        
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&page=${page}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

    const handleFirstPage = () => {
        setPage(1);
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&page=1`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

    const handleLastPage = () => {
        setPage(pageCount);
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&page=${pageCount}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

    const handlePrevious = () => {
        const newPage = (page - 1);
        setPage(newPage);
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&page=${newPage}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

    const handleNext = () => {
        const newPage = Number(page) + 1;
        setPage(newPage);
        let url = `?sort=${sort}`;
        if(search != ''){
            if(search != ''){
                url += `&search=${search}`;
            }
        }
        url += `&page=${newPage}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    }

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
                            <Link to="/issued-items/add" className='h-full bg-blue-500 px-3 text-white font-bold rounded flex items-center justify-center'>
                                {/* <IconRenderer name={'add'} className='w-4 h-4'></IconRenderer>  */}
                                Issue Item
                            </Link>
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
                                <select name="" id="" value={sort} onChange={handleSort} className='font-medium border border-gray-300 rounded h-full min-w-32 px-1 dark:bg-gray-800 dark:border-gray-500 cursor-pointer'>
                                    <option value="date-asc">Date of Issuance (Newest First)</option>
                                    <option value="date-desc">Date of Issuance (Oldest First)</option>
                                    <option value="emp-asc">Employee Name (A-Z)</option>
                                    <option value="emp-desc">Employee Name (Z-A)</option>
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

                <div className='w-full text-gray-500 dark:text-gray-400'>
                    {/* Table */}
                    <div className='w-full pb-2'>
                        <table className='w-full'>
                            <thead className='border-b border-gray-500 text-sm'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Employee Name</th>
                                    <th>Department</th>
                                    <th>Branch / Site</th>
                                    <th>Item</th>
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

                    {/* Pagination */}
                    <Pagination 
                        page= {page}
                        pageCount= {pageCount}
                        perPage= {perPage}
                        handlePerPage= {handlePerPage}
                        handleFirstPage= {handleFirstPage}
                        handlePrevious= {handlePrevious}
                        handleNext= {handleNext}
                        handleLastPage= {handleLastPage}
                        pageArray= {pageArray}
                        handlePageClick= {handlePageClick}
                    ></Pagination>

                </div>
            </div>
        </>
    )
}

export default Home