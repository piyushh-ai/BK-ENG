import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import adminReducer from "../features/admin/states/admin.sclice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});
