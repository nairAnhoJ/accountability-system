import axios from "axios";
import config from "../config/config";

const baseURL = `${config.BASE_URL}/api/accountability-system/items`;


export const getAll = async() => {
    // const query = window.location.search;
    try {
        const response = await axios.get(`${baseURL}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
