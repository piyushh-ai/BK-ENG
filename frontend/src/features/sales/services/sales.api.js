import axios from "axios";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// ── Stock APIs ────────────────────────────────────────────────────────────────

export const getCompanySheets = async () => {
  const response = await apiInstance.get("/getStock/company-sheets");
  return response.data;
};

export const getCompanyStock = async (sheetName, { page = 1, limit = 12, search = "" } = {}) => {
  const response = await apiInstance.get(`/getStock/company-stock/${sheetName}`, {
    params: { page, limit, search },
  });
  return response.data;
};

export const getBoschStock = async ({ page = 1, limit = 12, search = "" } = {}) => {
  const response = await apiInstance.get("/getStock/boschStock", {
    params: { page, limit, search },
  });
  return response.data;
};

export const masterSearch = async ({ page = 1, limit = 12, search = "" } = {}) => {
  const response = await apiInstance.get("/getStock/master-search", {
    params: { page, limit, search },
  });
  return response.data;
};

// ── Sales Order APIs ──────────────────────────────────────────────────────────

/**
 * Create a new sales order (with up to 7 images)
 * @param {FormData} formData  — must include partyName, description, images[]
 */
export const createOrder = async (formData) => {
  const response = await apiInstance.post("/salesOrder/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/**
 * Get logged-in user's own orders (paginated)
 */
export const getMyOrders = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiInstance.get("/salesOrder/my", {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Get single order detail
 */
export const getOrderById = async (id) => {
  const response = await apiInstance.get(`/salesOrder/${id}`);
  return response.data;
};

/**
 * Search own orders by party name
 */
export const searchOrders = async (q) => {
  const response = await apiInstance.get("/salesOrder/search", { params: { q } });
  return response.data;
};

/**
 * Delete own order (only if status = "pending")
 */
export const deleteOrder = async (id) => {
  const response = await apiInstance.delete(`/salesOrder/${id}`);
  return response.data;
};