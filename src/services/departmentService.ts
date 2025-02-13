import config from "../config/config";

const baseURL = `${config.defaults.baseURL}/api/departments`;

export const getAll = async() => {
    // const query = window.location.search;
    try {
        const response = await config.get(`${baseURL}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
