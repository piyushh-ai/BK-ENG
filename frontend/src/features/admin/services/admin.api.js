import axios from "axios";

const apiInstance = axios.create({
    baseURL: "/api/upload",
    withCredentials: true,
});

export const uploadExcel = async (formData) => {
    try {
        const response = await apiInstance.post("/upload-excel", formData);
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const getAllSalesUsers = async () => {
    try {
        const response = await axios.get("/api/auth/all-users", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (role) => {
    try {
        const response = await axios.put("/api/auth/update-role", role, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};