import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Me } from '../services/authService';

const AdminAuth = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const getMe = async() => {
            try {
                const response = await Me();
                const {id, role } = response.user;
                
                if(id === 1 && role === "admin"){
                    setIsAdmin(true);
                }else{
                    setIsAdmin(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getMe();
    }, [])
       
    if (isAdmin === null) return <div>Loading...</div>;

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />
}

export default AdminAuth