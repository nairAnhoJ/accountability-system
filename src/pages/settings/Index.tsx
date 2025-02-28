import { useEffect, useState } from "react"
import { getAll as itemsCategoryGetAll } from '../../services/itemCategoryService'
import Table from "../../components/Table"
import AddItemCategory from "./item-category/AddItemCategory"

const Index = () => {
  // Item Category Collection
  type ItemCategory = {
    id: number;
    name: string;
  }
  const [itemCategory, setItemCategory] = useState<ItemCategory[]>([]);
  // Item Category Collection

  // Item Category Add Modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<Boolean>(false);
  // Item Category Add Modal

  // 



  useEffect(() => {
    const getItemCategory = async() => {
        try {
            const response = await itemsCategoryGetAll();

            if(response.status == 403){
                localStorage.removeItem("token");
                window.location.href = "/login";
            }

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


  // After successfully added new category
  type NewData = {
    id: number;
    name: string;
  }
  const handleAdd = (newData: NewData) => {
    console.log(newData);
    setItemCategory((prevCollection) => [... prevCollection, newData])
  }
  // After successfully added new category




  const handleEdit = (id: number) => {
    console.log(id);
  }

  const handleDelete = (id: number) => {
    console.log(id);
  }

  const handleNotif = (message: string) => {

  }

  return (
    <>  
      {showAddCategoryModal && <AddItemCategory onClose={() => setShowAddCategoryModal(false)} onSave={handleAdd} showNotif={handleNotif} />}

      <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-100'>
          <h1 className="text-3xl font-bold mb-5">Settings</h1>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Item Category</h1>
            <button onClick={() => setShowAddCategoryModal(true)} className="">Add Item Category</button>
          </div>
          <Table columns={itemCategoryColumn} collection={itemCategory} withEdit={true} withDelete={true} editClick={(id) => handleEdit(id)} deleteClick={(id) => handleDelete(id)}/>
      </div>
    </>
  )
}

export default Index