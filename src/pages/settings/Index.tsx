import { useEffect, useState } from "react"

// Reusable Components
import Table from "../../components/Table"
import { Notification } from "../../components/Notification"

// Item Categories
import { getById, getAll as itemsCategoryGetAll } from '../../services/itemCategoryService'
import AddItemCategory from "./item-category/AddItemCategory"
import EditItemCategory from "./item-category/EditItemCategory"
import DeleteItemCategory from "./item-category/DeleteItemCategory"

// Items
import { getAll as itemsGetAll, getById as getItemById } from '../../services/itemsService'
import AddItem from "./items/AddItem"
import EditItem from "./items/EditItem"
import DeleteItem from "./items/DeleteItem"

// 
import { getAll as usersGetAll } from '../../services/usersService'



const Index = () => {
	// #region Notification
		const [notifIsVisible, setNotifIsVisible] = useState<boolean>(false);
		const [notifMessage, setNotifMessage] = useState<string>('');
	// #endregion

	// Handle Notification
	const handleNotif = (message: string) => {
		setNotifIsVisible(true);
		setNotifMessage(message);
	}



	// #region ~ ITEM CATEGORY ~

		// #region ~ TYPES ~

			type ItemCategory = {
				id: number;
				name: string;
			}

			// Table Columns
			type ItemCategoryColumns = {
				key: keyof ItemCategory;
				label: string;
				className: string;
			}

		// #endregion

		// #region ~ VARIABLEs ~

			// Collection
			const [itemCategory, setItemCategory] = useState<ItemCategory[]>([]);

			// Selected Item Category for Edit and Delete
			const [selectedCategory, setSelectedCategory] = useState<{id:number; name:string}>({ id: 0, name: '' });

			// Add Modal
			const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);

			// Edit Modal
			const [showEditCategoryModal, setShowEditCategoryModal] = useState<boolean>(false);

			// Delete Modal
			const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState<boolean>(false);

			// Table Columns
			const itemCategoryColumn:ItemCategoryColumns[] = [
				{ 
				key: 'name', 
				label: 'Name', 
				className: 'py-2 px-4 text-left' 
				}
			]

		// #endregion

		// #region ~ FUNCTIONS ~ 

			// Get All rows of Item Categories
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

			// Handle Edit
			const handleEdit = async(id: number) => {
				const response = await getById(id);
				setSelectedCategory(response);
				setShowEditCategoryModal(true)
			}

			// Handle Delete
			const handleDelete = async(id: number) => {
				const response = await getById(id);
				setSelectedCategory(response);
				setShowDeleteCategoryModal(true)
			}

		// #endregion

	// #endregion



	// #rgion ~ ITEMS ~

		// #region ~ TYPES ~

			type Items = {
				id: number;
				item_category_id: number;
				item_category_name: string;
				name: string;
			}

			// Table Columns
			type ItemsColumns = {
				key: keyof Items;
				label: string;
				className: string;
			}

		// #endregion

		// #region ~ VARIABLEs ~

			// Collection
			const [items, setItems] = useState<Items[]>([]);

			// Selected Item Category for Edit and Delete
			const [selectedItem, setSelectedItem] = useState<Items>({ id: 0, item_category_id: 0, item_category_name: '', name: '' });

			// Add Modal
			const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

			// Edit Modal
			const [showEditItemModal, setShowEditItemModal] = useState<boolean>(false);

			// Delete Modal
			const [showDeleteItemModal, setShowDeleteitemModal] = useState<boolean>(false);

			// Table Columns
			const itemsColumn:ItemsColumns[] = [
				{  key: 'name',  label: 'Name',  className: 'py-2 px-4 text-left' },
				{  key: 'item_category_name',  label: 'Category',  className: 'py-2 px-4 text-center' },
			]

		// #endregion

		// #region ~ FUNCTIONS ~ 

			// Get All rows of Item Categories
			const getItems = async() => {
				try {
					const response = await itemsGetAll();

					if(response.status == 403){
						localStorage.removeItem("token");
						window.location.href = "/login";
					}

					setItems(response)
				} catch (error) {
					console.log(error);
				}
			};

			// Handle Edit
			const handleEditItem = async(id: number) => {
				const response = await getItemById(id);
				console.log(response);
				
				setSelectedItem(response);
				setShowEditItemModal(true)
			}

			// Handle Delete
			const handleDeleteItem = async(id: number) => {
				const response = await getItemById(id);
				setSelectedItem(response);
				setShowDeleteitemModal(true)
			}

		// #endregion

	// #endregion




	// #region ~ USERS ~

		// #region ~ TYPES ~

			type Users = {
				id: number;
				item_category_id: number;
				name: string;
				email: string;
				phone: number;
				department_id: number;
				department_name: string;
				site_id: number;
				site_name: string;
				is_active: number;
			}

			// Table Columns
			type UsersColumns = {
				key: keyof Users;
				label: string;
				className: string;
			}

		// #endregion


		// #region ~ VARIABLEs ~

			// Collection
			const [users, setUsers] = useState<Items[]>([]);

			// Selected Item Category for Edit and Delete
			const [selectedUser, setSelectedUser] = useState<Items>({ id: 0, item_category_id: 0, item_category_name: '', name: '' });

			// Add Modal
			const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

			// Edit Modal
			const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

			// Delete Modal
			const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);

			// Table Columns
			const usersColumn:UsersColumns[] = [
				{  key: 'name',  label: 'Name',  className: 'py-2 px-4 text-left' },
				{  key: 'department_name',  label: 'Department',  className: 'py-2 px-4 text-center' },
				{  key: 'site_name',  label: 'Site',  className: 'py-2 px-4 text-center' },
			]

		// #endregion


		// #region ~ FUNCTIONS ~ 

			// Get All rows of Item Categories
			const getUsers = async() => {
				try {
					const response = await usersGetAll();
					console.log(response);

					if(response.status == 403){
						localStorage.removeItem("token");
						window.location.href = "/login";
					}

					setUsers(response);
				} catch (error) {
					console.log(error);
				}
			};

		// #endregion
			

	// #endregion


	useEffect(() => {
		getItemCategory();
		getItems();
		getUsers();
	}, [])

	return (
		<>  
			{/* Notification */}
			{ notifIsVisible && <Notification message={notifMessage} setNotifIsVisible={setNotifIsVisible} /> }


			{/* Item Category Modals */}
			{ showAddCategoryModal && <AddItemCategory onClose={() => setShowAddCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}
			{ showEditCategoryModal && <EditItemCategory oldData={selectedCategory} onClose={() => setShowEditCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}
			{ showDeleteCategoryModal && <DeleteItemCategory oldData={selectedCategory} onClose={() => setShowDeleteCategoryModal(false)} onSave={() => getItemCategory()} showNotif={handleNotif} />}


			{/* Item Category Modals */}
			{ showAddItemModal && <AddItem itemCategoryOptions={itemCategory} onClose={() => setShowAddItemModal(false)} onSave={() => getItems()} showNotif={handleNotif} />}
			{ showEditItemModal && <EditItem itemCategoryOptions={itemCategory} oldData={selectedItem} onClose={() => setShowEditItemModal(false)} onSave={() => getItems()} showNotif={handleNotif} />}
			{ showDeleteItemModal && <DeleteItem oldData={selectedItem} onClose={() => setShowDeleteitemModal(false)} onSave={() => getItems()} showNotif={handleNotif} />}



			<div className='h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 overflow-x-hidden p-6 text-gray-600 dark:text-gray-100'>
				<h1 className="text-3xl font-bold mb-5">Settings</h1>

				{/* ITEM CATEGORY */}
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-xl font-bold">Item Categories</h1>
						<button onClick={() => setShowAddCategoryModal(true)} className="py-2 px-3 bg-blue-500 rounded font-semibold text-sm">Add Item Category</button>
					</div>
					<div className="max-h-[400px] overflow-y-auto">
						<Table columns={itemCategoryColumn} collection={itemCategory} withEdit={true} withDelete={true} editClick={(id) => handleEdit(id)} deleteClick={(id) => handleDelete(id)}/>
					</div>
				{/* ITEM CATEGORY */}





				{/* ITEMS */}
					<div className="flex items-center justify-between mb-2 mt-14">
						<h1 className="text-xl font-bold">Items</h1>
						<button onClick={() => setShowAddItemModal(true)} className="py-2 px-3 bg-blue-500 rounded font-semibold text-sm">Add Item</button>
					</div>
					<div className="max-h-[400px] overflow-y-auto">
						<Table columns={itemsColumn} collection={items} withEdit={true} withDelete={true} editClick={(id) => handleEditItem(id)} deleteClick={(id) => handleDeleteItem(id)}/>
					</div>
				{/* ITEMS */}





				{/* USERS */}
					<div className="flex items-center justify-between mb-2 mt-14">
					<h1 className="text-xl font-bold">Users</h1>
					<button onClick={() => setShowAddItemModal(true)} className="py-2 px-3 bg-blue-500 rounded font-semibold text-sm">Add User</button>
					</div>
					<div className="max-h-[400px] overflow-y-auto">
					<Table columns={usersColumn} collection={users} withEdit={true} withDelete={true} editClick={(id) => handleEditItem(id)} deleteClick={(id) => handleDeleteItem(id)}/>
					</div>
				{/* USERS */}

			</div>
		</>
	)
}

export default Index