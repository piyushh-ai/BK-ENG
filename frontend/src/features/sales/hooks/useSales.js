import { useDispatch, useSelector } from "react-redux";
import { getBoschStock, getCompanySheets, getCompanyStock } from "../services/sales.api";
import { setBoschStock, setCompanySheets, setCompanyStock, setError, setLoading } from "../state/sales.slice";



export const useSales = () => {
    const dispatch = useDispatch();

    const fetchCompanySheets = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getCompanySheets();
            dispatch(setCompanySheets(response.data));
        } catch (error) {
            dispatch(setError(error));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const fetchCompanyStock = async (sheetName) => {
        try {
            dispatch(setLoading(true));
            const response = await getCompanyStock(sheetName);
            dispatch(setCompanyStock(response.data));
        } catch (error) {
            dispatch(setError(error));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const fetchBoschStock = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getBoschStock();
            dispatch(setBoschStock(response.data));
        } catch (error) {
            dispatch(setError(error));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        fetchCompanySheets,
        fetchCompanyStock,
        fetchBoschStock,
    }
}