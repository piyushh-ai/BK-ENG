import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app.routes";
import { getMe } from "../features/auth/services/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/state/auth.slice";
import GlobalLoader from "./GlobalLoader";

const App = () => {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getMe();
      
      // getMe returns { user: {...} } based on backend
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

  if (isCheckingAuth) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <Suspense fallback={<GlobalLoader />}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </div>
  );
};

export default App;
