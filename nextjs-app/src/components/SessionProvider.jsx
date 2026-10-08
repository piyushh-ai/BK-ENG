"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/auth/services/auth.api";
import { setUser } from "@/features/auth/state/auth.slice";
import GlobalLoader from "@/components/GlobalLoader";

export default function SessionProvider({ children }) {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
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
    checkAuth();
  }, [dispatch]);

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

  return <>{children}</>;
}
