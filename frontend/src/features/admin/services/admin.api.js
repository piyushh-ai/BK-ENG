import Axios from "axios";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const _uploadAxios = Axios.create({
    baseURL: "/api/upload",
    withCredentials: true,
});
const apiInstance = setupCache(_uploadAxios, { ttl: 2 * 60 * 1000, methods: ["get"] });

export const uploadExcel = async (formData) => {
    try {
        // POST — never cached
        const response = await _uploadAxios.post("/upload-excel", formData);
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

const _adminAxios = Axios.create({
    baseURL: "/api/admin",
    withCredentials: true,
});
const adminApiInstance = setupCache(_adminAxios, { ttl: 2 * 60 * 1000, methods: ["get"] });


// cache: false — admin must always see latest orders after any status update
export const getAllOrdersAdmin = async (page = 1, limit = 100) => {
    try {
        const response = await adminApiInstance.get(`/all?page=${page}&limit=${limit}`, { cache: false });
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

// cache: false — search must return live results
export const searchOrdersAdmin = async (query) => {
    try {
        const response = await adminApiInstance.get(`/search?q=${query}`, { cache: false });
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