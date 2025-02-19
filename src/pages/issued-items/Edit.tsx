import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAll as itemsGetAll } from '../../services/itemsService';
import { getAll as deptGetAll } from '../../services/departmentService';
import { getAll as siteGetAll } from '../../services/siteService';
import icons from "../../components/icons";

const Edit = () => {
    const location = useLocation();
    const data = location.state;

    // Icon Renderer
    const IconRenderer = ({name, className} : { name: string; className?: string }) => {
        if(!(name in icons)) return null;
        const Icon = icons[name as keyof typeof icons];
        return Icon ? <Icon className={className} /> : null
    }

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

    const [newData, setNewData] = useState({
        issued_to: data.issued_to,
        department_id: data.department_id,
        site_id: data.site_id,
        item_id: data.item_id,
        description: data.description,
        quantity: data.quantity,
        issued_by: data.issued_by,
        issued_date: data.issued_date,
    });
    console.log(data);

    const handleSubmit = () => {

    }

    type Errors = {
        path: string;
        msg: string;
    }
    const [errors, setErrors] = useState<Errors[]>([]);
    
    return (
        <>

            <div className="h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-200">
                <form onSubmit={handleSubmit} action="" className="w-full h-full">


                    {/* Controls  */}
                    <div className='flex gap-x-3 items-center justify-between mb-6 text-sm w-full'>
                        <div className='flex items-center'>
                            <Link to="/" className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full'>
                                <IconRenderer name={"back"} className={"w-7 h-7"} />
                            </Link>
                            <h1 className='font-bold text-3xl'>Edit</h1>
                        </div>

                        {/* Submit Button */}
                        <div className='flex items-center justify-end py-3'>
                            <button type='submit' className='flex items-center rounded bg-blue-500 px-7 py-2 text-white font-bold'>
                                <span className=' leading-5 text-sm'>UPDATE</span>
                            </button>
                        </div>
                    </div>


                    {/* Body */}
                    <div>
                        {/* Items */}
                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label htmlFor="">Item</label>
                            <select onChange={(e) => {setNewData({...newData, item_id: e.target.value ? Number(e.target.value) : 0})}} name='item_id' value={newData.item_id} className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                                <option hidden value="">Select an Item</option>
                                {
                                    items.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.find((err) => err.path == "item") ? (
                                    <p className='text-red-500'>{ errors.find((err) => err.path == "item")?.msg }</p>
                                ) : null
                            }
                        </div>

                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label>Employee Name</label>
                            <input onChange={(e) => {setNewData({...newData, issued_to: e.target.value})}} value={newData.issued_to} type="text" className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                        </div>

                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label htmlFor="">Department</label>
                            <select onChange={(e) => {setNewData({...newData, department_id: e.target.value ? Number(e.target.value) : 0})}} name='department_id' value={newData.department_id} className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                                <option hidden value="">Select an Item</option>
                                {
                                    departments.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.find((err) => err.path == "item") ? (
                                    <p className='text-red-500'>{ errors.find((err) => err.path == "item")?.msg }</p>
                                ) : null
                            }
                        </div>

                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label htmlFor="">Site</label>
                            <select onChange={(e) => {setNewData({...newData, site_id: e.target.value ? Number(e.target.value) : 0})}} name='site_id' value={newData.site_id} className='w-96 border border-gray-400 h-10 px-2 rounded dark:bg-gray-100 dark:text-gray-600'>
                                <option hidden value="">Select an Item</option>
                                {
                                    sites.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.find((err) => err.path == "item") ? (
                                    <p className='text-red-500'>{ errors.find((err) => err.path == "item")?.msg }</p>
                                ) : null
                            }
                        </div>

                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label>Item Description</label>
                            <input onChange={(e) => {setNewData({...newData, description: e.target.value})}} value={newData.description} type="text" className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                        </div>

                        <div className='flex flex-col font-semibold mb-3 text-sm'>
                            <label>Quantity</label>
                            <input onChange={(e) => {setNewData({...newData, quantity: e.target.value})}} value={newData.quantity} type="number" className='w-96 px-2 h-10 rounded border border-gray-400 dark:bg-gray-100 dark:text-gray-600 dark:disabled:bg-gray-400'/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;
