import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Stock
  companySheets: [],
  companyStock: [],
  boschStock: [],

  // Orders
  myOrders: [],
  ordersPagination: null,
  activeOrder: null,       // single order detail
  searchResults: [],       // party name search results

  // Shared
  loading: false,
  orderLoading: false,     // separate loader for order operations
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    // ── Stock ─────────────────────────────────────────────────
    setCompanySheets: (state, action) => {
      state.companySheets = action.payload;
    },
    setCompanyStock: (state, action) => {
      state.companyStock = action.payload;
    },
    setBoschStock: (state, action) => {
      state.boschStock = action.payload;
    },

    // ── Orders ────────────────────────────────────────────────
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    appendMyOrders: (state, action) => {
      // For infinite scroll / load-more
      state.myOrders = [...state.myOrders, ...action.payload];
    },
    setOrdersPagination: (state, action) => {
      state.ordersPagination = action.payload;
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    // Prepend a newly created order to list (no re-fetch needed)
    prependOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },
    // Remove deleted order from list
    removeOrder: (state, action) => {
      state.myOrders = state.myOrders.filter((o) => o._id !== action.payload);
    },

    // ── Shared ────────────────────────────────────────────────
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.orderLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCompanySheets,
  setCompanyStock,
  setBoschStock,
  setMyOrders,
  appendMyOrders,
  setOrdersPagination,
  setActiveOrder,
  setSearchResults,
  prependOrder,
  removeOrder,
  setLoading,
  setOrderLoading,
  setError,
} = salesSlice.actions;

export default salesSlice.reducer;