"use client";
import { getAllSalesUsers, updateRole, uploadExcel, getAllOrdersAdmin, updateOrderStatusAdmin, deleteOrderAdmin, searchOrdersAdmin } from "../services/admin.api";
import { useDispatch } from "react-redux";
import { setLoading, setError, setUploadStatus, setSalesUser, setAllOrders, updateOrder, removeOrder } from "../states/admin.sclice";

export const useAdmin = () => {
  const dispatch = useDispatch();

  const handleUpload = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await uploadExcel(formData);
      dispatch(setLoading(false));
      dispatch(setError(null));
      dispatch(setUploadStatus(response.message));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error?.response?.data?.message || error.message || "Upload failed"));
      dispatch(setUploadStatus("Upload failed"));
    }
  };

  const handleAllSalesUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllSalesUsers();
      dispatch(setSalesUser(response.users));
      dispatch(setLoading(false));
      dispatch(setError(null));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to fetch users"));
      dispatch(setSalesUser(null));
    }
  };

  const handleUpdateRole = async (role) => {
    try {
      dispatch(setLoading(true));
      const response = await updateRole(role);
      dispatch(setLoading(false));
      dispatch(setError(null));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to update role"));
    }
  };

  const handleGetAllOrders = async (page = 1, limit = 100, dateRange = {}) => {
    try {
      dispatch(setLoading(true));
      const response = await getAllOrdersAdmin(page, limit, dateRange);
      dispatch(setAllOrders(response.orders || []));
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to fetch orders"));
    }
  };

  const handleSearchOrders = async (query) => {
    try {
      if (!query) return await handleGetAllOrders();
      dispatch(setLoading(true));
      const response = await searchOrdersAdmin(query);
      dispatch(setAllOrders(response.orders || []));
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error?.response?.data?.message || error.message || "Search failed"));
    }
  };

  const handleUpdateOrderStatus = async (id, payload) => {
    try {
      // Optimistic update — UI responds instantly
      dispatch(updateOrder({ _id: id, ...payload }));
      const response = await updateOrderStatusAdmin(id, payload);
      return response;
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to update order"));
      throw error;
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      // Optimistic remove — gone from list immediately
      dispatch(removeOrder(id));
      const response = await deleteOrderAdmin(id);
      return response;
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || error.message || "Failed to delete order"));
      throw error;
    }
  };

  return { 
    handleUpload,
    handleAllSalesUser,
    handleUpdateRole,
    handleGetAllOrders,
    handleSearchOrders,
    handleUpdateOrderStatus,
    handleDeleteOrder
  };
};
