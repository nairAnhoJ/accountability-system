<div align="center">
    <h1>Accountability System</h1>

    ![React](https://img.shields.io/badge/React-19.0-blue.svg)
    ![NodeJS](https://img.shields.io/badge/NodeJS-20.12-green.svg)
</div>

A web application for tracking company-issued items to employees. It records borrowed items, monitors their status, and logs returns to ensure accountability and proper asset management.

<br/>

## Installation

#### Prerequisites
Before installing, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)

#### Steps to Install
1. Clone the repository

~~~
git clone https://github.com/nairAnhoJ/accountability-system.git
cd accountability-system
~~~

2. Install dependencies
~~~
npm install
~~~

3. Set up environment variables
~~~
cp .env.example .env
# Update the environment variables as needed.
~~~

4. Start the development server
~~~
npm run dev
~~~

5. Build for production (optional)
~~~
npm run build
~~~

6. Run the production build
~~~
npm run preview
~~~

<br/>
<br/>

## How to use the application

#### **1. Logging In**
Open the web application in your browser.  
Enter your ID number and password, then click **'Login'**.

![Login Page](docs/images/login.png)

#### **2. Viewing Issued Items**
After logging in, you will see a list of all issued items.
![Issued Item List](docs/images/issued-item.png)

#### **3. Issuing a New Item**
- Click the **'Issue Item/s'** button to open the issue items form.
- Fill in the necessary details.
- Click **'Submit'**.
![Issued Item Add Form](docs/images/issued-item-add.png)

**Bulk Adding Employees:**  
- Click the **'Add'** button.
- Fill in all the required fields.
- Click **'Submit'**.


#### **4. Viewing Item Details**
- In the **Issued Items List**, click on a row to see more details.
![Issued Item More Details](docs/images/issued-item-more-details.png)


#### **5. Updating an Item's Status**
- In the modal, click the **'Update Status'** button.
- Change the item's status from **'Issued'** to either **'Returned'** or **'Lost'**.
- Fill in the form, then click **'Update'**.
![Issued Item Update Status](docs/images/issued-item-update-status.png)