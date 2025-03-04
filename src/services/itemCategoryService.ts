import config from "../config/config";

const baseURL = `${config.defaults.baseURL}/api/accountability-system/item-categories`;

interface Data {
    name: string;
}

export const getAll = async() => {
    try {
        const response = await config.get(`${baseURL}`);
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

export const update = async(data: Data, id: number) => {
    try {
        const response = await config.put(`${baseURL}/update/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};
