import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminOrderDetail from "../features/admin/components/AdminOrderDetail";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import SalesDashboard from "../features/sales/pages/SalesDashboard";
import Protected from "../features/auth/components/Protected";
import GlobalLoader from "./GlobalLoader";

// Auth pages: lazy is fine — notifications never navigate here
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/sales/overview" replace />,
      },
    ],
  },
  {
    path: "/sales",
    children: [
      {
        index: true,
        element: <Navigate to="/sales/overview" replace />,
      },
      {
        path: ":tab",
        element: (
          <Protected role="sales">
            <SalesDashboard />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<GlobalLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<GlobalLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<GlobalLoader />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<GlobalLoader />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/system" replace />,
      },
      {
        path: ":tab",
        element: (
          <Protected role="admin">
            <AdminDashboard />
          </Protected>
        ),
      },
      {
        path: "/admin/order/:orderId",
        element: (
          <Protected role="admin">
            <AdminOrderDetail />
          </Protected>
        ),
      },
    ],
  },
]);
