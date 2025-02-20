import config from "../config/config";

const token = localStorage.getItem("token");

interface UpdateStatusData {
    id: number;
    status: string;
    remarks: string;
}

const baseURL = `${config.defaults.baseURL}/api/accountability-system/issued-item`;

export const getAll = async() => {
    const query = window.location.search;
    try {
        const response = await config.get(`${baseURL}${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const create = async(data: any) => {
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
}

export const update = async(id: number, data: any) => {
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
} 

export const updateStatus = async(id: number, data: UpdateStatusData) => {
    try {
        const response = await config.put(`${baseURL}/update-status/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
}