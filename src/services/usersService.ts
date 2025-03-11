import config from "../config/config";

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/users`;

interface Data {
    id_number: string;
    name: string;
    email: string;
    phone: number;
    department_id: number;
    site_id: number;
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
        const response = await config.get(`${baseURL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const create = async(data: Data) => {
    console.log(data);
    
    try {
        const response = await config.post(`${baseURL}/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const update = async(data: Data, id: number) => {
    try {
        const response = await config.put(`${baseURL}/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const deleteUser = async(id: number) => {
    try {
        const response = await config.patch(`${baseURL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};
