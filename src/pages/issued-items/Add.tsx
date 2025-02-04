import { useEffect, useState } from 'react'
import icons from '../../components/icons'
import { Link } from 'react-router-dom'
import { getAll as itemsGetAll } from '../../services/itemsService';
import { getAll as deptGetAll } from '../../services/departmentService';
import { getAll as siteGetAll } from '../../services/siteService';
import { create } from '../../services/issuedItemService';

let id = 1;

function Add() {
    const [deptIsChecked, setDeptIsChecked] = useState(false);
    const [siteIsChecked, setSiteIsChecked] = useState(false);
    const [descriptionIsChecked, setDescriptionIsChecked] = useState(false);
    const [quantityIsChecked, setQuantityIsChecked] = useState(false);
    const [dateTimeIsChecked, setDateTimeIsChecked] = useState(false);

    // All Data
    type AllData = {
        allItem: number;
        allDepartment: number;
        allSite: number;
        allDescription: string;
        allQuantity: number;
        allDateTime: string;
    }
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 8);
    const [allData, setAllData] = useState<AllData >({
        allItem: 0,
        allDepartment: 0,
        allSite: 0,
        allDescription: '',
        allQuantity: 1,
        allDateTime: currentDateTime.toISOString().slice(0, 16),
    });

    // Departments Options
    type Department = {
        id: number;
        name: string;
    }
    const [departments, setDepartments] = useState<Department[] >([]);

    // Sites Options
    type Site = {
        id: number;
        name: string;
    }
    const [sites, setSites] = useState<Site[] >([]);

    // Items Options
    type Item = {
        id: number;
        name: string;
    }
    const [items, setItems] = useState<Item[]>([]);

    // Employee Data
    type Data = {
        id: number;
        name: string;
        department: number;
        site: number;
        description: string;
        quantity: number;
        dateTime: string;
    };
    const [data, setData] = useState<Data[] >([
        { 
            id: id,
            name: '',
            department: 0,
            site: 0,
            description: '',
            quantity: 1,
            dateTime: currentDateTime.toISOString().slice(0, 16),
        }
    ]);

    // Add new row in data
    const handleAdd = () => {
        setData([...data,
            {
                id: ++id,
                name: '',
                department: 0,
                site: 0,
                description: '',
                quantity: 1,
                dateTime: currentDateTime.toISOString().slice(0, 16),
            }
        ])
    }

    // Data Handler
    const handleData = (e, objIndex) => {
        const columnName = e.target.name;
        
        const newData = data.map((obj, index) => {
            if(objIndex == index){
                return {...obj, [columnName]: e.target.value}
            }
            return obj;
        })

        setData(newData);
    }

    // Delete a row in the Data
    const handleDelete = (id) => {
        setData(
            data.filter(d =>
                d.id != id
            )
        )
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const submitData = {
            item: allData.allItem,

            // All Department
            deptIsChecked: deptIsChecked,
            allDepartment: allData.allDepartment,

            // All Site
            siteIsChecked: siteIsChecked,
            allSite: allData.allSite,

            // All Description
            descriptionIsChecked: descriptionIsChecked,
            allDescription: allData.allDescription,

            // All Quantity
            quantityIsChecked: quantityIsChecked,
            allQuantity: allData.allQuantity,

            // Employee Data
            data: data
        }

        // console.log(submitData);

        try {
            const response = await create(submitData);
            // console.log(response);
        } catch (error) {
            // console.log(error);
        }
    }

    // Icon Renderer
    const IconRenderer = ({name, className} : { name: string; className?: string }) => {
        if(!(name in icons)) return null;
        const Icon = icons[name as keyof typeof icons];
        return Icon ? <Icon className={className} /> : null
    }

    useEffect(() => {

        console.log(currentDateTime);
        console.log(allData.allDateTime);
        
        const getItems = async() => {
            try {
                const response = await itemsGetAll();
                setItems(response)
            } catch (error) {
                console.log(error);
            }
        }
        const getDepartments = async() => {
            try {
                const response = await deptGetAll();
                setDepartments(response)
            } catch (error) {
                console.log(error);
            }
        }
        const getSites = async() => {
            try {
                const response = await siteGetAll();
                setSites(response)
            } catch (error) {
                console.log(error);
            }
        }
        getItems();
        getDepartments();
        getSites();
    }, [])

  return (
    <>
        <form method='post' onSubmit={handleSubmit} className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-200'>
            {/* Back button, Title, Submit Button  */}
            <div className='flex gap-x-3 items-center justify-between mb-6 text-sm w-full'>
                <div className='flex items-center'>
                    <Link to="/" className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full'>
                        <IconRenderer name={"back"} className={"w-7 h-7"} />
                    </Link>
                    <h1 className='font-bold text-3xl'>Issue Item</h1>
                </div>

                {/* Submit Button */}
                <div className='flex items-center justify-end py-3'>
                    <button type='submit' className='flex items-center rounded bg-blue-500 px-7 py-2 text-white font-bold'>
                        <span className=' leading-5 text-sm'>SUBMIT</span>
                    </button>
                </div>
            </div>

            {/* Item, Department, Site, Description, Quantity, Date/Time */}
            <div className='flex mb-3'>
                {/* Item, Department, Site */}
                <div className='w-full'>
                    {/* Items */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <label htmlFor="">Item</label>
                        <select onChange={(e) => {setAllData({...allData, allItem: e.target.value ? Number(e.target.value) : 0})}} name='allItem' className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                            <option hidden value="">Select an Item</option>
                            {
                                items.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* Departments */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <div>
                            <input type="checkbox" onClick={() => {setDeptIsChecked(!deptIsChecked)}} id="departmentCheckBox" name='deptIsChecked' className='mr-1' />
                            <label htmlFor="departmentCheckBox">Department 
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees belong to the same department
                                </span>
                            </label>
                        </div>
                        <select disabled={!deptIsChecked} name='allDepartment' onChange={(e) => {setAllData({...allData, allDepartment: e.target.value ? Number(e.target.value) : 0})}} className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                            <option hidden value="">Select a department</option>
                            {
                                departments.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* Site */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <div>
                            <input type="checkbox" onClick={() => {setSiteIsChecked(!siteIsChecked)}} id="siteCheckBox" className='mr-1' />
                            <label htmlFor="siteCheckBox">Site
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees belong to the same site
                                </span>
                            </label>
                        </div>
                        <select disabled={!siteIsChecked} onChange={(e) => {setAllData({...allData, allSite: e.target.value ? Number(e.target.value) : 0})}}  className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                            <option hidden value="">Select a site</option>
                            {
                                sites.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {/* Description, Quantity, Date/Time */}
                <div className='w-full'>
                    {/* Description */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <div>
                            <input type="checkbox" onClick={() => {setDescriptionIsChecked(!descriptionIsChecked)}} name="" id="descriptionCheckBox" className='mr-1' />
                            <label htmlFor="descriptionCheckBox">Description
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees share the same item description.
                                </span>
                            </label>
                        </div>
                        <input disabled={!descriptionIsChecked} onChange={(e) => {setAllData({...allData, allDescription: e.target.value})}} type="text" className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                    </div>
                    {/* Quantity */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <div>
                            <input type="checkbox" onClick={() => {setQuantityIsChecked(!quantityIsChecked)}} name="" id="quantityCheckBox" className='mr-1' />
                            <label htmlFor="quantityCheckBox">Quantity
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees share the same item description.
                                </span>
                            </label>
                        </div>
                        <input disabled={!quantityIsChecked} type="number" min={1} onChange={(e) => {setAllData({ ...allData, allQuantity: e.target.value ? Number(e.target.value) : 1 })}} value={allData.allQuantity} className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                    </div>
                    {/* Date Time */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <div>
                            <input type="checkbox" onClick={() => {setDateTimeIsChecked(!dateTimeIsChecked)}} name="" id="dateTimeCheckBox" className='mr-1' />
                            <label htmlFor="dateTimeCheckBox">Date/Time
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees share the same issuance date and time.
                                </span>
                            </label>
                        </div>
                        <input disabled={!dateTimeIsChecked} type="datetime-local" onChange={(e) => {setAllData({ ...allData, allDateTime: e.target.value })}} value={allData.allDateTime} className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                    </div>
                </div>
            </div>

            {/* Add Button */}
            <div className='w-full flex items-center justify-end py-3'>
                <button type='button' onClick={handleAdd} className='flex items-center rounded bg-blue-500 px-7 py-2 text-white font-bold'>
                    <IconRenderer name={"add"} className={"w-4 h-4 mr-1"}></IconRenderer>
                    <span className=' leading-5 text-sm'>ADD</span>
                </button>
            </div>

            <div className='w-full'>
                {/* Grid Header */}
                <div className="w-full grid grid-cols-12 font-semibold text-sm border-b pb-2 border-gray-400">
                    <div className='text-center col-span-1'>
                        #
                    </div>
                    <div className='text-center col-span-2'>
                        Employee Name
                    </div>
                    <div className='text-center col-span-2'>
                        Department
                    </div>
                    <div className='text-center col-span-2'>
                        Site
                    </div>
                    <div className='text-center col-span-2'>
                        Description
                    </div>
                    <div className='text-center col-span-1'>
                        Quantity
                    </div>
                    <div className='text-center col-span-1'>
                        Date/Time
                    </div>
                    <div className='text-center col-span-1'>
                        Action
                    </div>
                </div>

                {/* Data Forms */}
                <div>
                    {
                        data.map((datum, index) => (
                            <div key={index} className="w-full grid grid-cols-12 pt-2">
                                <div className='text-center h-full flex items-center justify-center col-span-1'>
                                    {index+1}
                                </div>
                                <div className='text-center p-2 col-span-2'>
                                    <input onChange={(e) => handleData(e, index)} type="text" name='name' autoComplete='off' className='text-sm h-8 w-full p-2 border border-gray-400 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                                </div>
                                <div className='text-center p-2 col-span-2'>
                                    <select disabled={deptIsChecked} onChange={(e) => handleData(e, index)} name='department' className='w-full border border-gray-400 h-full px-2 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'>
                                        <option hidden value="">Select a department</option>
                                        {
                                            departments.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='text-center p-2 col-span-2'>
                                    <select disabled={siteIsChecked} onChange={(e) => handleData(e, index)} name='site' className='w-full border border-gray-400 h-full px-2 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'>
                                        <option hidden value="">Select a site</option>
                                        {
                                            sites.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='text-center p-2 col-span-2'>
                                    <input type="text" disabled={descriptionIsChecked} onChange={(e) => handleData(e, index)} name='description' autoComplete='off' className='text-sm h-8 w-full p-2 border border-gray-600 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                                </div>
                                <div className='text-center p-2 col-span-1'>
                                    <input disabled={quantityIsChecked} onChange={(e) => handleData(e, index)} name='quantity' autoComplete='off' value={datum.quantity} type="number" min={1} max={99} className='text-center text-sm h-8 w-full p-2 border border-gray-600 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                                </div>
                                <div className='text-center p-2 col-span-1'>
                                    <input disabled={dateTimeIsChecked} type="datetime-local" onChange={(e) => handleData(e, index)} value={allData.allDateTime} className='text-center text-sm h-8 w-full p-2 border border-gray-600 rounded dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                                </div>
                                {
                                    ((index != 0) ? 
                                        <div className='text-center p-2 col-span-1 flex items-center justify-center'>
                                            <button onClick={() => handleDelete(datum.id)}>
                                                <IconRenderer name={"delete"} className={"w-7 h-7 text-red-500"}></IconRenderer>
                                            </button>
                                        </div> 
                                    : 
                                        ''
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </form>
    </>
  )
}

export default Add