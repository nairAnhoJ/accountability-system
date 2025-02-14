import { useEffect, useState } from 'react'
import icons from '../components/icons';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { getAll, updateStatus } from '../services/issuedItemService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Show from './issued-items/Show';
import UpdateStatus from './issued-items/UpdateStatus'


function Home() {
    const navigate = useNavigate();
    const location = useLocation();

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
        remarks: string;
        issued_by: string;
        issued_date: string;
        received_by: string;
        returned_date: string;
    };

    // const [showFilter, setShowFilter] = useState(false);
    const [collection, setCollection] = useState<Item[]>([]);
    const [sort, setSort] = useState('date-asc');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [pageArray, setPageArray] = useState<number[] >([]);
    const [notif, setNotif] = useState<string >(location.state?.message)
    
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'medium', timeStyle: 'short'});

    const updateDateFormat = () => {
        setCollection((prevItem) => 
            prevItem.map((item) => (
                {
                    ...item,
                    issued_date: dateTimeFormatter.format(new Date(item.issued_date)),
                    returned_date: dateTimeFormatter.format(new Date(item.returned_date)),
                }
            ))
        );
    };

    const getCollection = async() => {
        try {
            const response = await getAll() as {status : number; search: string; sort: string; pagination: any; collection: any;};
            if(response.status == 403){
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
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

            updateDateFormat();
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


    // Show Modal
        const [show, setShow] = useState(false);
        const [showRow, setshowRow] = useState<Item>()
        const handleRowClick = (row: Item) => {
            setShow(true);
            setshowRow(row);
        }
        const handleShowClose = () => {
            setShow(false);
        }
    // Show Modal




    // Update Status Modal
        type UpdateStatusData = {
            id: number;
            status: string;
            received_by: string;
            returned_date: string;
            remarks: string;
        }
        const [updateStatusData, setUpdateStatusId] = useState<UpdateStatusData>({
            id: 0,
            status: '',
            received_by: 'Ako',
            returned_date: '',
            remarks: ''
        });
        const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false)
        const handleShowUpdateStatus = (data: Item) => {
            setShowUpdateStatusModal(true);
            setUpdateStatusId({...updateStatusData, id: data.id, status: data.status, remarks: data.remarks });
        }
        const handleUpdateStatus = async (data: UpdateStatusData) => {
            data.returned_date = data.returned_date.replace('T', ' ');
            try {
                const response = await updateStatus(data.id, data) as { data: any; status: number; response: any };
                if(response.status == 200){
                    const newData = response.data.data;
                    setCollection((prevItem) => 
                        prevItem.map((item) => (
                            item.id === newData.id ?
                            {
                                ...item,
                                status: newData.status,
                                received_by: newData.received_by,
                                returned_date: dateTimeFormatter.format(new Date(newData.returned_date)),
                                remarks: newData.remarks,
                            }
                            :
                            item
                        ))
                    );

                    setNotif(response.data.message);
                    setShowUpdateStatusModal(false);
                    setShow(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const handleCloseUpdateStatusModal = () => {
            setShowUpdateStatusModal(false);
        }
    // Update Status Modal






    // Table Columns
    type Columns = {
        key: keyof Item;
        label: string;
        className: string;
    }
    const columns:Columns[] = [
        { key: 'issued_to', label: 'Employee Name', className: 'py-2 px-4 text-left' },
        { key: 'department_name', label: 'Department', className: 'text-center' },
        { key: 'item_name', label: 'Item', className: 'text-center' },
        { key: 'description', label: 'Item Description', className: 'text-center' },
        { key: 'quantity', label: 'Quantity', className: 'text-center' },
        { key: 'status', label: 'Status', className: 'text-center' },
        { key: 'issued_date', label: 'Date of Issuance', className: 'text-center' },
    ]
    // Table Columns



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
            { show && showRow && <Show data={showRow} showCloseButton={handleShowClose} updateStatusButton={handleShowUpdateStatus} /> }
            { showUpdateStatusModal && updateStatusData.id != 0 && <UpdateStatus data={updateStatusData} yesUpdateStatusButton={handleUpdateStatus} updateStatusCloseButton={handleCloseUpdateStatusModal}/>}

            <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6'>
                {/* Notification */}
                {(notif) && (
                        <div className='absolute flex items-center justify-between left-1/2 -translate-x-1/2 text-white bg-green-600 pl-5 pr-3 py-3 rounded font-bold tracking-wide border border-green-900 z-[90]'>
                            <p className='flex items-center pr-20 pt-1'>{notif}</p>
                            <button onClick={() => setNotif('') }>
                                <IconRenderer name='close' className='w-6 h-6'></IconRenderer>
                            </button>
                        </div>
                )}

                {/* Controls */}
                <div>
                    <div className='w-full h-10 flex items-center justify-between mb-3'>
                        <div className='h-full'>
                            <Link to="/issued-items/add" className='h-full bg-blue-500 px-3 text-white font-bold rounded flex items-center justify-center'>
                                {/* <IconRenderer name={'add'} className='w-4 h-4'></IconRenderer>  */}
                                Issue Item/s
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
                        <Table 
                            columns={columns} 
                            collection={collection}
                            onRowClick={handleRowClick}
                        ></Table>
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