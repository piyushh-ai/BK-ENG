import React, { useState, useEffect, useRef } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import { useParams, useNavigate } from "react-router-dom";
import AdminOrderList from "../components/AdminOrderList";
import CreateOrder from "../../sales/components/CreateOrder";
import OrderHistory from "../../sales/components/OrderHistory";
import SalesDashboard from "../../sales/pages/SalesDashboard";

// ── SystemSettings Sub-Component (Original AdminDashboard Code) ──
const SystemSettings = () => {
    const allSalesUsers = useSelector((state) => state.admin.allSalesUsers);
    const loading = useSelector((state) => state.admin.loading);
    const uploadStatus = useSelector((state) => state.admin.uploadStatus);
    const { handleAllSalesUser, handleUpload, handleUpdateRole } = useAdmin();
  
    const [boschFile, setBoschFile] = useState(null);
    const [companyFile, setCompanyFile] = useState(null);
  
    const headerRef = useRef(null);
    const uploadRef = useRef(null);
    const usersRef = useRef(null);
  
    useEffect(() => {
      handleAllSalesUser();
    }, []);
  
    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(uploadRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(usersRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, []);
  
    const onUpdateStock = async () => {
      if (!boschFile && !companyFile) {
        alert("Please select at least one file to upload."); return;
      }
      const formData = new FormData();
      if (boschFile) formData.append("bosch", boschFile);
      if (companyFile) formData.append("company", companyFile);
      await handleUpload(formData);
      setBoschFile(null);
      setCompanyFile(null);
    };
  
    const toggleRole = async (user) => {
      const newRole = user.role === "admin" ? "sales" : "admin";
      await handleUpdateRole({ _id: user._id, role: newRole });
      handleAllSalesUser();
    };
  
    return (
      <main className="w-full max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col gap-12 pb-24">
        <header ref={headerRef}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4" style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-on-surface-variant)" }}>Admin Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 transition-colors" style={{ color: "var(--color-on-surface)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            System Dashboard
          </h1>
          <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>Manage inventory files and system personnel.</p>
        </header>
  
        <section ref={uploadRef} className="p-8 md:p-10 rounded-3xl border shadow-sm" style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--color-on-surface)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Update Stock Data</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Bosch Upload */}
            <div className="relative group">
              <label className="block text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: "var(--color-outline)" }}>Bosch Stock File</label>
              <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300 hover:border-primary" style={{ borderColor: boschFile ? "var(--color-primary)" : "var(--color-outline-variant)", background: boschFile ? "var(--color-primary-fixed)" : "var(--color-surface-container-low)" }}>
                <input type="file" accept=".xlsx, .xls" onChange={(e) => setBoschFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="w-12 h-12 rounded-full grid place-items-center mb-3 transition-colors" style={{ background: boschFile ? "var(--color-primary)" : "var(--color-surface-container-highest)" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={boschFile ? "var(--color-on-primary)" : "var(--color-on-surface-variant)"}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <span className="font-semibold text-center" style={{ color: boschFile ? "var(--color-on-primary-fixed)" : "var(--color-on-surface)" }}>{boschFile ? boschFile.name : "Select Bosch Excel"}</span>
              </div>
            </div>
            {/* Company Upload */}
            <div className="relative group">
              <label className="block text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: "var(--color-outline)" }}>Company Stock File</label>
              <div className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300 hover:border-primary" style={{ borderColor: companyFile ? "var(--color-primary)" : "var(--color-outline-variant)", background: companyFile ? "var(--color-primary-fixed)" : "var(--color-surface-container-low)" }}>
                <input type="file" accept=".xlsx, .xls" onChange={(e) => setCompanyFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="w-12 h-12 rounded-full grid place-items-center mb-3 transition-colors" style={{ background: companyFile ? "var(--color-primary)" : "var(--color-surface-container-highest)" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={companyFile ? "var(--color-on-primary)" : "var(--color-on-surface-variant)"}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <span className="font-semibold text-center" style={{ color: companyFile ? "var(--color-on-primary-fixed)" : "var(--color-on-surface)" }}>{companyFile ? companyFile.name : "Select Company Excel"}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button onClick={onUpdateStock} disabled={loading || (!boschFile && !companyFile)} className="px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto" style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
              {loading ? "Processing..." : "Update Stock"}
            </button>
            {uploadStatus && <span className="font-semibold px-4 py-2 rounded-lg text-sm sm:text-base text-center w-full sm:w-auto text-green-700 bg-green-100">{uploadStatus}</span>}
          </div>
        </section>
  
        <section ref={usersRef}>
          <div className="flex items-end justify-between mb-8 text-black">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--color-on-surface)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Team Members</h2>
              <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>Manage system access and roles</p>
            </div>
            <div className="text-sm font-bold px-4 py-2 rounded-full shadow-sm" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface)" }}>Total: {allSalesUsers?.length || 0}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSalesUsers?.map((u) => (
              <div key={u._id} className="p-6 rounded-2xl border shadow-sm transition-all relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-2 h-full" style={{ background: u.role === "admin" ? "var(--color-tertiary-fixed-dim)" : "var(--color-primary)" }} />
                <div className="flex items-start justify-between pl-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{u.name}</h3>
                    <p className="text-sm mb-4 truncate w-40 text-gray-500">{u.email}</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider" style={{ background: u.role === "admin" ? "var(--color-tertiary-container)" : "var(--color-primary-container)", color: u.role === "admin" ? "var(--color-on-tertiary-container)" : "var(--color-on-primary-container)" }}>{u.role}</span>
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 shadow-sm border-gray-100"><img src={`https://api.dicebear.com/9.x/initials/svg?seed=${u.name}`} alt={u.name}/></div>
                </div>
                <div className="mt-6 pt-4 border-t pl-4 flex items-center justify-between border-gray-200">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Access Level</span>
                  <button onClick={() => toggleRole(u)} className="text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm bg-gray-100 hover:bg-gray-200 text-gray-800">Set to {u.role === "admin" ? "Sales" : "Admin"}</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
};

const AdminDashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || "system";

  return (
    <div className="min-h-screen font-sans flex flex-col relative" style={{ background: "var(--color-background)" }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: `linear-gradient(var(--color-outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />

      <Navbar activeTab={activeTab} onTabChange={(t) => navigate(`/admin/${t}`)} />

      <div className="z-10 w-full relative">
        {activeTab === "system" && <SystemSettings />}
        
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
