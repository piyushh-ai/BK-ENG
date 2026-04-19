import { useDispatch, useSelector } from "react-redux";
import {
  getBoschStock,
  getCompanySheets,
  getCompanyStock,
  createOrder as createOrderApi,
  getMyOrders as getMyOrdersApi,
  getOrderById as getOrderByIdApi,
  searchOrders as searchOrdersApi,
  deleteOrder as deleteOrderApi,
} from "../services/sales.api";
import {
  setBoschStock,
  setCompanySheets,
  setCompanyStock,
  setLoading,
  setOrderLoading,
  setError,
  setMyOrders,
  setOrdersPagination,
  setActiveOrder,
  setSearchResults,
  prependOrder,
  removeOrder,
} from "../state/sales.slice";

export const useSales = () => {
  const dispatch = useDispatch();

  // ── Stock fetchers ──────────────────────────────────────────────────

  const fetchCompanySheets = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getCompanySheets();
      dispatch(setCompanySheets(response.companySheets || []));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCompanyStock = async (sheetName, params) => {
    try {
      dispatch(setLoading(true));
      const response = await getCompanyStock(sheetName, params);
      dispatch(setCompanyStock(response.companyStock || []));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchBoschStock = async (params) => {
    try {
      dispatch(setLoading(true));
      const response = await getBoschStock(params);
      dispatch(setBoschStock(response.boschStock || []));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ── Order hooks ─────────────────────────────────────────────────────

  /**
   * Create a new sales order
   * @param {FormData} formData
   * @returns {object} created order
   */
  const createOrder = async (formData) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await createOrderApi(formData);
      // Optimistically prepend to list — no re-fetch needed
      dispatch(prependOrder(data.order));
      return data;
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Fetch logged-in user's orders (replaces list)
   */
  const fetchMyOrders = async ({ page = 1, limit = 10 } = {}) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await getMyOrdersApi({ page, limit });
      dispatch(setMyOrders(data.orders || []));
      dispatch(setOrdersPagination(data.pagination || null));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Fetch single order detail
   */
  const fetchOrderById = async (id) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await getOrderByIdApi(id);
      dispatch(setActiveOrder(data.order));
      return data.order;
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Search orders by party name
   */
  const searchOrders = async (q) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await searchOrdersApi(q);
      dispatch(setSearchResults(data.orders || []));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Delete own order (only pending)
   * @returns boolean — true if deleted
   */
  const deleteOrder = async (id) => {
    dispatch(setOrderLoading(true));
    try {
      await deleteOrderApi(id);
      // Optimistically remove from list
      dispatch(removeOrder(id));
      return true;
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  return {
    fetchCompanySheets,
    fetchCompanyStock,
    fetchBoschStock,
    createOrder,
    fetchMyOrders,
    fetchOrderById,
    searchOrders,
    deleteOrder,
  };
};