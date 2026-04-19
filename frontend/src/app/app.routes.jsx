import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import SalesDashboard from "../features/sales/pages/SalesDashboard";

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
    ],
  },
]);

