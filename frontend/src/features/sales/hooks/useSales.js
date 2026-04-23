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
  normalizeError,
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

  const fetchCompanySheets = async (signal) => {
    try {
      dispatch(setLoading(true));
      const response = await getCompanySheets(signal);
      dispatch(setCompanySheets(response.companySheets || []));
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      dispatch(setError(normalizeError(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCompanyStock = async (sheetName, params, signal) => {
    try {
      dispatch(setLoading(true));
      const response = await getCompanyStock(sheetName, params, signal);
      dispatch(setCompanyStock(response.companyStock || []));
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      dispatch(setError(normalizeError(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchBoschStock = async (params, signal) => {
    try {
      dispatch(setLoading(true));
      const response = await getBoschStock(params, signal);
      dispatch(setBoschStock(response.boschStock || []));
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      dispatch(setError(normalizeError(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ── Order hooks ─────────────────────────────────────────────────────

  /**
   * Create a new sales order.
   * @param {FormData} formData
   * @param {Function} [onUploadProgress]  — (percent: number) => void
   * @returns {object} created order
   */
  const createOrder = async (formData, onUploadProgress) => {
    dispatch(setOrderLoading(true));
    try {
      const progressCb = onUploadProgress
        ? (e) => {
            if (e.total) onUploadProgress(Math.round((e.loaded / e.total) * 100));
          }
        : undefined;

      const data = await createOrderApi(formData, progressCb);
      // Optimistically prepend to list — no re-fetch needed
      dispatch(prependOrder(data.order));
      return data;
    } catch (error) {
      const msg = normalizeError(error);
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Fetch logged-in user's orders (replaces list).
   */
  const fetchMyOrders = async ({ page = 1, limit = 10 } = {}, signal) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await getMyOrdersApi({ page, limit }, signal);
      dispatch(setMyOrders(data.orders || []));
      dispatch(setOrdersPagination(data.pagination || null));
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      dispatch(setError(normalizeError(error)));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Fetch single order detail.
   */
  const fetchOrderById = async (id, signal) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await getOrderByIdApi(id, signal);
      dispatch(setActiveOrder(data.order));
      return data.order;
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      const msg = normalizeError(error);
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Search orders by party name.
   */
  const searchOrders = async (q, signal) => {
    dispatch(setOrderLoading(true));
    try {
      const data = await searchOrdersApi(q, signal);
      dispatch(setSearchResults(data.orders || []));
    } catch (error) {
      if (error?.name === "CanceledError" || error?.name === "AbortError") return;
      dispatch(setError(normalizeError(error)));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

  /**
   * Delete own order (only pending).
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
      const msg = normalizeError(error);
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