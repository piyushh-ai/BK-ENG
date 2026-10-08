import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

// ─── Base axios instance ───────────────────────────────────────────────────────
const axiosInstance = Axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 15_000, // 15 s default — every request
});

// ─── Cache wrapper (GET only, 2-minute TTL) ────────────────────────────────────
const apiInstance = setupCache(axiosInstance, {
  ttl: 2 * 60 * 1000,
  methods: ["get"],
});

// ─── Error normalizer ──────────────────────────────────────────────────────────
/**
 * Returns a user-friendly message from any Axios error.
 * Network/timeout errors get the "reload & try again" wording.
 */
export const normalizeError = (error) => {
  if (Axios.isCancel(error)) {
    return "Request cancelled.";
  }
  if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK" || !error.response) {
    return "Network issue. Please check your connection and try again.";
  }
  return error?.response?.data?.message || error.message || "Something went wrong.";
};

// ── Stock APIs ────────────────────────────────────────────────────────────────

export const getCompanySheets = async (signal) => {
  const response = await apiInstance.get("/getStock/company-sheets", { signal });
  return response.data;
};

export const getCompanyStock = async (sheetName, { page = 1, limit = 12, search = "" } = {}, signal) => {
  const response = await apiInstance.get(`/getStock/company-stock/${sheetName}`, {
    params: { page, limit, search },
    signal,
  });
  return response.data;
};

export const getBoschStock = async ({ page = 1, limit = 12, search = "" } = {}, signal) => {
  const response = await apiInstance.get("/getStock/boschStock", {
    params: { page, limit, search },
    signal,
  });
  return response.data;
};

export const masterSearch = async ({ page = 1, limit = 12, search = "" } = {}, signal) => {
  const response = await apiInstance.get("/getStock/master-search", {
    params: { page, limit, search },
    signal,
  });
  return response.data;
};

// ── Sales Order APIs ──────────────────────────────────────────────────────────

/**
 * Create a new sales order (with up to 7 images).
 * Uses a dedicated 60-second timeout to allow Cloudinary uploads.
 */
export const createOrder = async (formData, onUploadProgress) => {
  const response = await axiosInstance.post("/salesOrder/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60_000, // 60 s — Cloudinary uploads can be slow on poor connections
    onUploadProgress,
  });
  return response.data;
};

/**
 * Get logged-in user's own orders (paginated).
 * cache: false — always fetch fresh so newly created orders appear immediately.
 */
export const getMyOrders = async ({ page = 1, limit = 10 } = {}, signal) => {
  const response = await apiInstance.get("/salesOrder/my", {
    params: { page, limit },
    cache: false,
    signal,
  });
  return response.data;
};

/**
 * Get single order detail.
 */
export const getOrderById = async (id, signal) => {
  const response = await apiInstance.get(`/salesOrder/${id}`, { cache: false, signal });
  return response.data;
};

/**
 * Search own orders by party name.
 */
export const searchOrders = async (q, signal) => {
  const response = await apiInstance.get("/salesOrder/search", {
    params: { q },
    cache: false,
    signal,
  });
  return response.data;
};

/**
 * Delete own order (only if status = "pending").
 */
export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`/salesOrder/${id}`);
  return response.data;
};