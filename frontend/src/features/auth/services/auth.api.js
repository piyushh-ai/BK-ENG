import axios from "axios";

const apiInstance = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
});

export const register = async (userData) => {
    try {
        const response = await apiInstance.post("/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await apiInstance.post("/login", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
