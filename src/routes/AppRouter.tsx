import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";

// Issued Items
import IssuedItemsAdd from '../pages/issued-items/Add'
import RequireAuth from "./RequireAuth";


function AppRouter() {
    return (
        <Router>
            <HeaderWrapper />
            {/* <HeaderWrapper /> */}
            <Routes>
                <Route path="/login" element={<Login />}></Route>

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/issued-items/add" element={<IssuedItemsAdd />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </Router>
    );
}

const HeaderWrapper = () => {
    const token = localStorage.getItem("token");
    const path = useLocation();
    const hideHeaderRoutes = ['/', '', '/issued-items/add'];

    if(hideHeaderRoutes.includes(path.pathname) && token){
        return <Header />
    }
}

export default AppRouter;