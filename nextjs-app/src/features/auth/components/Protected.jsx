"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Protected = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role && user.role !== role) {
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/sales/overview");
        }
      }
    }
  }, [user, loading, role, router]);

  if (loading || !user || (role && user.role !== role)) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return children;
};

export default Protected;
