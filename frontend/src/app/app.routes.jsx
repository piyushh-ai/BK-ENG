import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminOrderDetail from "../features/admin/components/AdminOrderDetail";

const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));
const Protected = lazy(() => import("../features/auth/components/Protected"));
const AdminDashboard = lazy(() => import("../features/admin/pages/AdminDashboard"));
const SalesDashboard = lazy(() => import("../features/sales/pages/SalesDashboard"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/sales/overview" replace />
      },
    ],
  },
  {
    path: "/sales",
    children: [
      {
        index: true,
        element: <Navigate to="/sales/overview" replace />
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
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/system" replace />
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
            <AdminOrderDetail  />
          </Protected>
        ),
      }
    ],
  },
]);

