import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allSalesUsers: null,
    allOrders: [],
    loading: false,
    error: null,
    uploadStatus:null,
  },
  reducers: {
    setSalesUser: (state, action) => {
      state.allSalesUsers = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    // Optimistic in-place update — no full refetch needed
    updateOrder: (state, action) => {
      const idx = state.allOrders.findIndex((o) => o._id === action.payload._id);
      if (idx !== -1) state.allOrders[idx] = { ...state.allOrders[idx], ...action.payload };
    },
    removeOrder: (state, action) => {
      state.allOrders = state.allOrders.filter((o) => o._id !== action.payload);
    },
  },
});

export const { setSalesUser, setAllOrders, setLoading, setError, setUploadStatus, updateOrder, removeOrder } = adminSlice.actions;
export default adminSlice.reducer;
