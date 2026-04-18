import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allSalesUsers: null,
    loading: false,
    error: null,
    uploadStatus:null,
  },
  reducers: {
    setSalesUser: (state, action) => {
      state.allSalesUsers = action.payload;
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
  },
});

export const { setSalesUser, setLoading, setError,setUploadStatus } = adminSlice.actions;
export default adminSlice.reducer;
