import { useDispatch, useSelector } from "react-redux";
import { register as registerApi, login as loginApi } from "../services/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";

export const useAuth = () =>{
    const dispatch = useDispatch();

    const register = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await registerApi(userData);
            dispatch(setUser(response.user));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };

    const login = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await loginApi(userData);
            dispatch(setUser(response.user));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };

    return {
        register,
        login,
    };
}