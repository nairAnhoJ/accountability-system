import config from "../config/config";

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/departments`;

export const getAll = async() => {
    // const query = window.location.search;
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
