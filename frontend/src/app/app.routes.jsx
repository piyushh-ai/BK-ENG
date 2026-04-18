import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <h1>Hello</h1>
      </Protected>
    ),
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
        element: (
          <Protected role="admin">
            <AdminDashboard />
          </Protected>
        ),
      },
    ],
  },
]);
