import { useDispatch, useSelector } from "react-redux";
import { register as registerApi, login as loginApi, getMe as getMeApi, logout as logoutApi } from "../services/auth.api";
import { setUser, setLoading, setError, clearUser } from "../state/auth.slice";

export const useAuth = () =>{
    const dispatch = useDispatch();

    const register = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await registerApi(userData);
            dispatch(setUser(response.user));
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
            dispatch(setError(msg));
            dispatch(setLoading(false));
            throw new Error(msg);
        }
    };

    const login = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await loginApi(userData);
            dispatch(setUser(response.user));
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
            dispatch(setError(msg));
            dispatch(setLoading(false));
            throw new Error(msg);
        }
    };

    const getMe = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getMeApi();
            dispatch(setUser(response.user));
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
            dispatch(setError(msg));
            dispatch(setLoading(false));
            throw new Error(msg);
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (err) {
            // silently ignore logout API errors
        } finally {
            dispatch(clearUser());
        }
    };

    return {
        register,
        login,
        getMe,
        logout,
    };
}