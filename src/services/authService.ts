import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/auth`;

interface Data {
    id_number: string;
    password: string;
}

export const UserLogin = async(data: Data) => {
    try {
        const response = await axios.post(`${baseURL}/login`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const Me = async() => {
    try {
        const response = await axios.get(`${baseURL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}