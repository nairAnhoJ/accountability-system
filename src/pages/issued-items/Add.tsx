import { useEffect, useState } from 'react'
import icons from '../../components/icons'
import { Link } from 'react-router-dom'
import { getAll as itemsGetAll } from '../../services/itemsService';
import { getAll as deptGetAll } from '../../services/departmentService';
import { getAll as siteGetAll } from '../../services/siteService';

function Add() {
    const [deptIsChecked, setDeptIsChecked] = useState(false);
    const [siteIsChecked, setSiteIsChecked] = useState(false);
    const [descriptionIsChecked, setDescriptionIsChecked] = useState(false);
    const [quantityIsChecked, setQuantityIsChecked] = useState(false);

    // Data
    type Data = {
        item: number;
        department: number;
        site: number;
        description: string;
        quantity: number;
    }
    const [data, setData] = useState<Data >({
        item: 0,
        department: 0,
        site: 0,
        description: '',
        quantity: 1,
    });

    // Departments
    type Department = {
        id: number;
        name: string;
    }
    const [departments, setDepartments] = useState<Department[] >([]);

    // Sites
    type Site = {
        id: number;
        name: string;
    }
    const [sites, setSites] = useState<Site[] >([]);

    // Items
    type Item = {
        id: number;
        name: string;
    }
    const [items, setItems] = useState<Item[]>([]);

    const IconRenderer = ({name, className} : { name: string; className?: string }) => {
        if(!(name in icons)) return null;
        const Icon = icons[name as keyof typeof icons];
        return Icon ? <Icon className={className} /> : null
    }

    useEffect(() => {
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
        <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-200'>
            {/* Back button and title */}
            <div className='flex gap-x-3 items-center justify-start mb-6 text-sm'>
                <Link to="/" className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full'>
                    <IconRenderer name={"back"} className={"w-7 h-7"} />
                </Link>
                <h1 className='font-bold text-3xl'>Issue Item</h1>
            </div>

            <div className='flex mb-3'>
                <div className='w-full'>
                    {/* Items */}
                    <div className='flex flex-col font-semibold mb-3 text-sm'>
                        <label htmlFor="">Item</label>
                        <select onChange={(e) => {setData({...data, item: e.target.value ? Number(e.target.value) : 0})}} className='w-96 border border-gray-400 h-10 px-2 rounded'>
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
                            <input type="checkbox" onClick={() => {setDeptIsChecked(!deptIsChecked)}} id="departmentCheckBox" className='mr-1' />
                            <label htmlFor="departmentCheckBox">Department 
                                <span className='text-xs italic'>
                                    <span className='text-red-500 not-italic'>🔺</span>
                                    Check this if all employees belong to the same department
                                </span>
                            </label>
                        </div>
                        <select disabled={!deptIsChecked} onChange={(e) => {setData({...data, department: e.target.value ? Number(e.target.value) : 0})}} className='w-96 border border-gray-400 h-10 px-2 rounded'>
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
                        <select disabled={!siteIsChecked} onChange={(e) => {setData({...data, site: e.target.value ? Number(e.target.value) : 0})}}  className='w-96 border border-gray-400 h-10 px-2 rounded'>
                            <option hidden value="">Select a site</option>
                            {
                                sites.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
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
                        <input disabled={!descriptionIsChecked} onChange={(e) => {setData({...data, description: e.target.value})}} type="text" className='w-96 px-2 h-10 rounded border border-gray-400'/>
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
                        <input disabled={!quantityIsChecked} type="number" onChange={(e) => {setData({ ...data, quantity: e.target.value ? Number(e.target.value) : 1 })}} value={data.quantity} className='w-96 px-2 h-10 rounded border border-gray-400'/>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center justify-end py-3 px-10'>
                <button className='flex items-center rounded bg-blue-500 px-4 py-1 text-white font-bold'>
                    <IconRenderer name={"add"} className={"w-5 h-5"}></IconRenderer>
                    ADD
                </button>
            </div>

            <div className='w-full'>
                {/* Grid Header */}
                <div className="w-full grid grid-cols-12 font-semibold text-sm border-b pb-2 border-gray-400">
                    <div className='text-center col-span-1'>
                        #
                    </div>
                    <div className='text-center col-span-3'>
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
                        Action
                    </div>
                </div>

                <div>
                    <div className="w-full grid grid-cols-12 pt-2">
                        <div className='text-center h-full flex items-center justify-center col-span-1'>
                            1
                        </div>
                        <div className='text-center p-2 col-span-3'>
                            <input type="text" className='text-sm h-8 w-full p-2 border border-gray-400 rounded'/>
                        </div>
                        <div className='text-center p-2 col-span-2'>
                            <select disabled={deptIsChecked} onChange={(e) => {setData({...data, department: e.target.value ? Number(e.target.value) : 0})}}  className='w-full border border-gray-400 h-full px-2 rounded'>
                                <option hidden value="">Select a department</option>
                                {
                                    departments.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='text-center p-2 col-span-2'>
                            <select disabled={siteIsChecked} onChange={(e) => {setData({...data, site: e.target.value ? Number(e.target.value) : 0})}}  className='w-full border border-gray-400 h-full px-2 rounded'>
                                <option hidden value="">Select a site</option>
                                {
                                    sites.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='text-center p-2 col-span-2'>
                            <input type="text" className='text-sm h-8 w-full p-2 border border-gray-600 rounded'/>
                        </div>
                        <div className='text-center p-2 col-span-1'>
                            <input type="number" min={1} max={99} className='text-center text-sm h-8 w-full p-2 border border-gray-600 rounded'/>
                        </div>
                        <div className='text-center p-2 col-span-1 flex items-center justify-center'>
                            <button>
                                <IconRenderer name={"delete"} className={"w-7 h-7 text-red-500"}></IconRenderer>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Add