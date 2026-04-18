import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.routes";
import { getMe } from "../features/auth/services/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/state/auth.slice";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    const user = await getMe();
    dispatch(setUser(user));
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
