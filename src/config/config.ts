import axios from "axios";

const config = axios.create({
    baseURL: "http://localhost:5000",
});

config.interceptors.request.use((cnfg) => {
    const token = localStorage.getItem("token");
    if(token){
        cnfg.headers.Authorization = `Bearer ${token}`
    }
    return cnfg;
})

export default config;