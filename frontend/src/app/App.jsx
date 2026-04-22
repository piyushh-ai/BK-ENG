import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app.routes";
import { getMe } from "../features/auth/services/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/state/auth.slice";
import GlobalLoader from "./GlobalLoader";

const App = () => {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const checkAuth = async () => {
    try {
      const response = await getMe();
      if (response && response.user) {
        dispatch(setUser(response.user));
      }
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Dynamic title based on role
  useEffect(() => {
    if (!user) {
      document.title = "BK Eng";
    } else if (user.role === "admin") {
      document.title = "BK Eng · Admin";
    } else {
      document.title = "BK Eng · Sales";
    }
  }, [user]);

  if (isCheckingAuth) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
