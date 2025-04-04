import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from '../pages/Login'
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";

// Issued Items
import Home from '../pages/Home'
import IssuedItemsAdd from '../pages/issued-items/Add'
import IssuedItemsEdit from '../pages/issued-items/Edit'


// Settings
import Settings from '../pages/settings/Index'

import RequireAuth from "./RequireAuth";
import AdminAuth from "./AdminAuth";
import ChangePassword from "../pages/ChangePassword";
import RequireAuthOnly from "./RequireAuthOnly";


function AppRouter() {
    return (
        <Router>
            <HeaderWrapper />
            {/* <HeaderWrapper /> */}
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<RequireAuth />}>
                    {/* HOME AND ISSUED ITEMS */}
                    <Route path="/" element={<Home />} />
                    <Route path="/issued-items/add" element={<IssuedItemsAdd />} />
                    <Route path="/issued-items/edit" element={<IssuedItemsEdit />} />

                    <Route element={<AdminAuth />}>
                        {/* SETTING */}
                        <Route path='/settings' element={<Settings />} />
                    </Route>
                </Route>
                
                <Route element={<RequireAuthOnly />}>
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

const HeaderWrapper = () => {
    const token = localStorage.getItem("token");
    
    const path = useLocation();
    const hideHeaderRoutes = ['/', '', '/issued-items/add', '/issued-items/edit', '/settings', '/settings'];

    if(hideHeaderRoutes.includes(path.pathname) && token){
        return <Header />
    }
}

export default AppRouter;