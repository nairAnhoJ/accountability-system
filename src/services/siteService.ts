import config from "../config/config";

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/sites`;


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
