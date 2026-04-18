import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    companySheets: [],
    companyStock: [],
    boschStock: [],
    loading: false,
    error: null,
}

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        setCompanySheets: (state, action) => {
            state.companySheets = action.payload;
        },
        setCompanyStock: (state, action) => {
            state.companyStock = action.payload;
        },
        setBoschStock: (state, action) => {
            state.boschStock = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setCompanySheets, setCompanyStock, setBoschStock, setLoading, setError } = salesSlice.actions;
export default salesSlice.reducer;