import axios from "axios";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

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