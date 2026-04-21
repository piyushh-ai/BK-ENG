import axios from "axios";

const apiInstance = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
});

// ── Session restore for React Native WebView ────────────────────────────────
// When the app is killed and restarted, the httpOnly cookie is gone.
// The native app pre-loads the stored token into localStorage via
// injectedJavaScriptBeforeContentLoaded. This interceptor picks it up and
// sends it as a Bearer token so the backend can re-establish the session.
apiInstance.interceptors.request.use((config) => {
    try {
        const token = typeof window !== 'undefined' && window.localStorage
            ? window.localStorage.getItem('bk_auth_token')
            : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    } catch (e) {
        // localStorage might be unavailable in some environments
    }
    return config;
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

export const getMe = async () => {
    try {
        const response = await apiInstance.get("/user/me");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await apiInstance.post("/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forgetPassword = async (userData) => {
    try {
        const response = await apiInstance.post("/forget-password", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (userData) => {
    try {
        const response = await apiInstance.post("/reset-password", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

