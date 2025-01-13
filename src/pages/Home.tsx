import React, { useEffect, useState } from 'react'
import IconAdd from '../assets/IconAdd'
import IconFilter from '../assets/IconFilter';
import IconSearch from '../assets/IconSearch';

function Home() {

    const [showFilter, setShowFilter] = useState(false);

    const showFilterToggle = () => {
        setShowFilter(!showFilter);
    };

    return (
        <>
            <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6'>
                {/* Controls */}
                <div>
                    <div className='w-full h-10 flex items-center justify-between mb-3'>
                        <div className='h-full'>
                            <button className='h-full bg-blue-500 px-3 text-white font-bold rounded flex items-center justify-center'>
                                <IconAdd className='w-4 h-4'></IconAdd>Add
                            </button>
                        </div>
                        <div className='flex items-center h-full gap-x-3 text-gray-500 dark:text-gray-300'>
                            <div className='h-full flex items-center gap-x-1 relative'>
                                <IconSearch className='h-5 w-5 ml-2 absolute'></IconSearch>
                                <input type="text" className='h-full rounded w-80 border pl-8 dark:bg-gray-800' />
                                <button className='absolute right-2 font-medium border border-gray-300 rounded px-1 tracking-tight'>Search</button>
                            </div>
                            <div className='h-full flex items-center gap-x-1'>
                                {/* <IconSort className='h-5 w-5'></IconSort> */}
                                <span className='font-medium'>Sort by</span>
                                <select name="" id="" className='font-medium border rounded h-full min-w-32 px-1 dark:bg-gray-800 cursor-pointer'>
                                    <option value="">Employee Name (A-Z)</option>
                                    <option value="">Employee Name (Z-A)</option>
                                    <option value="">Date of Issuance (Newest First)</option>
                                    <option value="">Date of Issuance (Oldest First)</option>
                                </select>
                            </div>
                            <button onClick={showFilterToggle} className='h-full flex items-center gap-x-1 border rounded px-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                <IconFilter className='h-5 w-5'></IconFilter>
                                <span className='font-medium'>Filter</span>
                            </button>
                        </div>
                    </div>
                    <div className={`w-full overflow-hidden transition-all duration-300 ${showFilter ? 'h-10 opacity-100' : 'h-0 opacity-0'}`}>
                        <div className='w-full h-full flex text-gray-500 dark:text-gray-300'>
                            <div className='h-full flex items-center gap-x-1'>
                                <span className='font-medium'>Department</span>
                                <select name="" id="" className='font-medium border rounded h-full min-w-32 px-1 dark:bg-gray-800 cursor-pointer'>
                                    <option value="">IT</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Home