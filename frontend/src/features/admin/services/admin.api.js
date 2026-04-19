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

const adminApiInstance = axios.create({
    baseURL: "/api/admin",
    withCredentials: true,
});

export const getAllOrdersAdmin = async (page = 1, limit = 100) => {
    try {
        const response = await adminApiInstance.get(`/all?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateOrderStatusAdmin = async (id, payload) => {
    try {
        const response = await adminApiInstance.put(`/orders/${id}/status`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchOrdersAdmin = async (query) => {
    try {
        const response = await adminApiInstance.get(`/search?q=${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteOrderAdmin = async (id) => {
    try {
        const response = await adminApiInstance.delete(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateFCMToken = async (fcmToken) => {
    try {
        const response = await axios.post("/api/auth/fcm-token", { fcmToken }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};