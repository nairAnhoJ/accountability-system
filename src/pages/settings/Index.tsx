import { useEffect, useState } from "react"
import { getById, getAll as itemsCategoryGetAll } from '../../services/itemCategoryService'
import Table from "../../components/Table"
import AddItemCategory from "./item-category/AddItemCategory"
import EditItemCategory from "./item-category/EditItemCategory"
import { Notification } from "../../components/Notification"
import DeleteItemCategory from "./item-category/DeleteItemCategory"


const Index = () => {
  const [notifIsVisible, setNotifIsVisible] = useState<boolean>(false);
  const [notifMessage, setNotifMessage] = useState<string>('');
  const [selected, setSelected] = useState<{id:number; name:string}>({
    id: 0,
    name: ''
  })



  // Item Category Collection
  type ItemCategory = {
    id: number;
    name: string;
  }
  const [itemCategory, setItemCategory] = useState<ItemCategory[]>([]);
  // Item Category Collection


  // Item Category Add Modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
  // Item Category Add Modal



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

  useEffect(() => {
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
  // type NewData = {
  //   id: number;
  //   name: string;
  // }
  // const handleAdd = (newData: NewData) => {
  //   setItemCategory((prevCollection) => [... prevCollection, newData])
  // }
  // After successfully added new category








  // EDIT ITEM CATEGORY
    const [showEditCategoryModal, setShowEditCategoryModal] = useState<boolean>(false);

    const handleEdit = async(id: number) => {
      const response = await getById(id);
      setSelected(response);
      setShowEditCategoryModal(true)
    }
  // EDIT ITEM CATEGORY




  // DELETE ITEM CATEGORY
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState<boolean>(false);

    const handleDelete = async(id: number) => {
      const response = await getById(id);
      setSelected(response);
      setShowDeleteCategoryModal(true)
    }
  // DELETE ITEM CATEGORY




  const handleNotif = (message: string) => {
    setNotifIsVisible(true);
    setNotifMessage(message);
  }





  return (
    <>  
      { showAddCategoryModal && <AddItemCategory onClose={() => setShowAddCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}
      { showEditCategoryModal && <EditItemCategory oldData={selected} onClose={() => setShowEditCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}
      { showDeleteCategoryModal && <DeleteItemCategory oldData={selected} onClose={() => setShowDeleteCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}
      { notifIsVisible && <Notification message={notifMessage} setNotifIsVisible={setNotifIsVisible} /> }

      <div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-100'>
          <h1 className="text-3xl font-bold mb-5">Settings</h1>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">Item Category</h1>
            <button onClick={() => setShowAddCategoryModal(true)} className="py-2 px-3 bg-blue-500 rounded font-semibold text-sm">Add Item Category</button>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <Table columns={itemCategoryColumn} collection={itemCategory} withEdit={true} withDelete={true} editClick={(id) => handleEdit(id)} deleteClick={(id) => handleDelete(id)}/>
          </div>
      </div>
    </>
  )
}

export default Index