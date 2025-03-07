import config from "../config/config";

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/users`;

interface Data {
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

export const getAll = async() => {
    try {
        const response = await config.get(`${baseURL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async(id: number) => {
    try {
        const response = await config.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const create = async(data: Data) => {
    try {
        const response = await config.post(`${baseURL}/create`, data);
        return response;
    } catch (error) {
        return error;
    }
};
