import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";

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
    element: (
      <Protected role="admin">
        <h1>admin page</h1>
      </Protected>
    ),
  },
]);
