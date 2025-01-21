import axios from "axios";
import config from "../config/config";

// const endPoints = "/api/accountability-system/issued-item"
const baseURL = `${config.BASE_URL}/api/accountability-system/issued-item`;


export const getAll = async() => {
    const query = window.location.search;
    try {
        const collection = await axios.get(`${baseURL}${query}`);
        return collection.data;
    } catch (error) {
        console.log(error);
    }
};