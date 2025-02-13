import axios from "axios"
import config from "../config/config"

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
