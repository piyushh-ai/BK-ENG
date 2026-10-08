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
      } else if (role === "admin" && user.role !== "admin") {
        router.push("/sales/overview");
      } else if (role === "sales" && user.role === "admin") {
        router.push("/admin/system");
      }
    }
  }, [user, loading, role, router]);

  if (loading || !user) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", gap: "16px",
        background: "var(--color-background)", color: "var(--color-on-surface)"
      }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          border: "3px solid var(--color-outline-variant)",
          borderTopColor: "var(--color-primary)",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{ fontSize: "14px", color: "var(--color-on-surface-variant)", fontFamily: "'DM Sans', sans-serif" }}>Loading…</span>
      </div>
    );
  }

  if (role === "admin" && user.role !== "admin") return null;
  if (role === "sales" && user.role === "admin") return null;

  return children;
};

export default Protected;
