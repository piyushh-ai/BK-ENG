import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebasePush } from "../hooks/useFirebasePush";
import Navbar from "../components/Navbar";
import SystemSettings from "../components/SystemSettings";
import AdminOrderList from "../components/AdminOrderList";
import CreateOrder from "../../sales/components/CreateOrder";
import SalesDashboard from "../../sales/pages/SalesDashboard";


const AdminDashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || "system";

  useFirebasePush();

  return (
    <div className="min-h-screen font-sans flex flex-col relative" style={{ background: "var(--color-background)" }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `linear-gradient(var(--color-outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <Navbar activeTab={activeTab} onTabChange={(t) => navigate(`/admin/${t}`)} />

      <div className="z-10 w-full relative">
        {activeTab === "system"     && <SystemSettings />}
        {activeTab === "all_orders" && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24">
            <AdminOrderList />
          </div>
        )}
        {(activeTab === "company" || activeTab === "bosch") && (
          <SalesDashboard hideNavbar={true} adminTab={activeTab} />
        )}
        {activeTab === "orders" && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24">
            <CreateOrder onSuccess={() => navigate("/admin/all_orders")} />
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
