import config from "../config/config";

const baseURL = `${config.defaults.baseURL}/api/sites`;


export const getAll = async() => {
    try {
        const response = await config.get(`${baseURL}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
