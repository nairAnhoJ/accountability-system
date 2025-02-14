import config from "../config/config";

interface UpdateStatusData {
    id: number;
    status: string;
    remarks: string;
}

const baseURL = `${config.defaults.baseURL}/api/accountability-system/issued-item`;


export const getAll = async() => {
    const query = window.location.search;
    try {
        const response = await config.get(`${baseURL}${query}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const create = async(data: any) => {
    try {
        const response = await config.post(`${baseURL}/create`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateStatus = async(id: number, data: UpdateStatusData) => {
    try {
        const response = await config.put(`${baseURL}/update-status/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
}