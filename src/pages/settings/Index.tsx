import { useEffect, useState } from "react"
import { getAll as itemsCategoryGetAll } from '../../services/itemCategoryService'
import Table from "../../components/Table"

const Index = () => {
  type ItemCategory = {
    id: number;
    name: string;
  }
  const [itemCategory, setItemCategory] = useState<ItemCategory[] >([]);

  useEffect(() => {
    const getItemCategory = async() => {
        try {
            const response = await itemsCategoryGetAll();
            console.log(response);
            setItemCategory(response)
        } catch (error) {
            console.log(error);
        }
    };
    
    getItemCategory();
  }, [])

  // Item Category Table Columns
  type ItemCategoryColumns = {
      key: keyof ItemCategory;
      label: string;
      className: string;
  }
  const itemCategoryColumn:ItemCategoryColumns[] = [
      { key: 'name', label: 'Name', className: 'py-2 px-4 text-left' },
  ]
  // Item Category Table Columns

  return (
    <>  
        <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-100'>
            <h1 className="text-3xl font-bold mb-5">Settings</h1>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Item Category</h1>
              <button>Add Item Category</button>
            </div>
            <Table columns={itemCategoryColumn} collection={itemCategory} />
        </div>
    </>
  )
}

export default Index