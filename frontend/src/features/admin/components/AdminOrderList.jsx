import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(imgRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)", delay: 0.05 });
    }
  }, [isOpen]);

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `order-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      window.open(url, '_blank');
    }
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div ref={overlayRef} className="oh-modal-overlay oh-img-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <button className="oh-img-close" onClick={onClose} style={{
        position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '20px', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(12px)', transition: 'background 0.2s'
      }}>✕</button>
      <div className="oh-img-container" onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', maxWidth: '1000px', width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <img ref={imgRef} src={imageUrl} alt="preview" style={{
          maxWidth: '100%', maxHeight: 'calc(85vh - 70px)', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }} />
        <button onClick={() => downloadImage(imageUrl)} style={{
          marginTop: '24px', padding: '12px 24px', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', transition: 'transform 0.15s, opacity 0.15s'
        }}>
          📥 Download Image
        </button>
      </div>
    </div>
  );
};

const AdminOrderList = () => {
  const allOrders = useSelector((state) => state.admin.allOrders);
  const loading = useSelector((state) => state.admin.loading);
  const { handleSearchOrders, handleUpdateOrderStatus, handleDeleteOrder } = useAdmin();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const highlightOrderId = searchParams.get("orderId");

  const listRef = useRef(null);

  // Initial Fetch & Debounced Search
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearchOrders(searchQuery);
    }, 450);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (allOrders?.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
      
      if (highlightOrderId) {
        setTimeout(() => {
          const el = document.getElementById(`order-${highlightOrderId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            gsap.fromTo(el, 
              { scale: 1.05, boxShadow: "0 0 0 4px var(--color-primary)" }, 
              { scale: 1, boxShadow: "0 0 0 0px var(--color-primary)", duration: 2, ease: "power2.out", delay: 0.5 }
            );
          }
        }, 600);
      }
    }
  }, [allOrders, highlightOrderId]);

  // Group by salesman name
  const groupedOrders = useMemo(() => {
    if (!allOrders) return {};
    return allOrders.reduce((acc, order) => {
      const salesmanName = order.user?.name || "Unknown Salesman";
      if (!acc[salesmanName]) {
        acc[salesmanName] = [];
      }
      acc[salesmanName].push(order);
      return acc;
    }, {});
  }, [allOrders]);

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setRemark(order.remark || "");
    setStatusModalOpen(true);
  };

  const submitStatusUpdate = async () => {
    setIsUpdating(true);
    await handleUpdateOrderStatus(selectedOrder._id, { status: newStatus, remark });
    await handleSearchOrders(searchQuery); // Refresh
    setIsUpdating(false);
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const deleteOrder = async (orderId) => {
    if(window.confirm("Are you incredibly sure you want to completely delete this order? This cannot be undone.")){
        await handleDeleteOrder(orderId);
        handleSearchOrders(searchQuery);
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setImgModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return { bg: "#fef08a", text: "#854d0e" };
      case "completed": return { bg: "#bbf7d0", text: "#166534" };
      case "cancelled": return { bg: "#fecaca", text: "#991b1b" };
      case "partial": return { bg: "#bfdbfe", text: "#1e40af" };
      default: return { bg: "#e5e7eb", text: "#374151" };
    }
  };

  return (
    <div className="w-full relative">
      
      {/* Search Header */}
      <div className="mb-8 max-w-2xl">
        <label className="block text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: "var(--color-outline)" }}>
          Find Orders
        </label>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search accurately by party name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all shadow-sm outline-none font-medium"
            style={{ 
              borderColor: "var(--color-outline-variant)", 
              background: "var(--color-surface-container-lowest)",
              color: "var(--color-on-surface)"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
            onBlur={(e) => e.target.style.borderColor = "var(--color-outline-variant)"}
          />
        </div>
      </div>

      {loading && (!allOrders || allOrders.length === 0) ? (
        <div className="flex justify-center p-20 text-gray-500 font-medium">
          Loading system orders...
        </div>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <div className="text-center p-20 text-gray-400">
           {searchQuery ? "No orders found for this party name." : "No orders currently punched in the system."}
        </div>
      ) : (
        <div ref={listRef} className="space-y-12">
          {Object.entries(groupedOrders).map(([salesman, orders]) => (
            <div key={salesman} className="bg-white/50 backdrop-blur-3xl rounded-3xl p-6 md:p-8 border shadow-sm" style={{ borderColor: 'var(--color-outline-variant)' }}>
              
              {/* Salesman Header */}
              <div className="flex items-center gap-4 mb-6 border-b pb-4" style={{ borderColor: 'var(--color-outline-variant)' }}>
                <div className="w-12 h-12 rounded-full border-2 grid place-items-center shadow-lg bg-white" style={{ borderColor: 'var(--color-primary)' }}>
                    <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${salesman}`} className="w-full h-full rounded-full" alt="Avatar"/>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold" style={{ color: "var(--color-on-surface)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {salesman}'s Orders
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mt-1">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Total
                  </p>
                </div>
              </div>

              {/* Orders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders.map((order, index) => {
                  const sColor = getStatusColor(order.status);
                  const dt = new Date(order.createdAt);
                  const isLatest = index === 0 && !searchQuery;

                  return (
                    <div id={`order-${order._id}`} key={order._id} className={`relative p-5 flex flex-col rounded-2xl border transition-all hover:shadow-lg ${isLatest ? 'bg-primary/5 border-primary/20' : 'bg-white'}`} style={{ borderColor: isLatest ? "" : "var(--color-outline-variant)" }}>
                      
                      {isLatest && (
                         <span className="absolute -top-3 right-4 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                           Latest
                         </span>
                      )}

                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">Party Name</span>
                            <span className="text-xl font-bold text-gray-900 leading-tight">{order.partyName}</span>
                        </div>
                        <span 
                          className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-sm border border-black/5" 
                          style={{ background: sColor.bg, color: sColor.text }}
                        >
                          {order.status}
                        </span>
                      </div>

                      {order.description && (
                        <div className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {order.description}
                        </div>
                      )}

                      {/* Display Images exact as OrderHistory */}
                      {order.images?.length > 0 && (
                        <div className="flex gap-2 min-h-[46px] mb-4">
                          {order.images.slice(0, 4).map((img, i) => (
                            <div key={i} className="h-11 w-11 rounded-lg border overflow-hidden cursor-pointer hover:shadow-md transition-transform hover:scale-105" onClick={() => handleImageClick(img.url)}>
                              <img src={img.url} alt={`img-${i}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {order.images.length > 4 && (
                            <div className="h-11 w-11 rounded-lg bg-gray-100 border flex items-center justify-center text-xs font-bold text-gray-500">
                              +{order.images.length - 4}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-4 items-center text-xs text-gray-500 mt-auto font-medium mb-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                        <span className="flex items-center gap-1">📅 {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                        <span className="flex items-center gap-1">🕒 {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => openStatusModal(order)}
                          className="px-4 py-2 text-sm font-bold rounded-xl text-white transition-opacity hover:opacity-80 shadow-md"
                          style={{ background: "var(--color-primary)" }}
                        >
                          Resolve Status
                        </button>

                        <button 
                          onClick={() => deleteOrder(order._id)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Order Permanently"
                        >
                          🗑️
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal Full Screen */}
      <ImageModal isOpen={imgModalOpen} imageUrl={selectedImage} onClose={() => setImgModalOpen(false)} />

      {/* Admin Status Update Background Modal */}
      {statusModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-black text-gray-900" style={{fontFamily: "'Bricolage Grotesque', sans-serif"}}>Update Order</h3>
                <p className="text-sm font-semibold text-gray-500 mt-1">Managing order for: <span className="text-primary">{selectedOrder.partyName}</span></p>
            </div>
            
            <div className="p-6 space-y-5 bg-gray-50">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Order Status</label>
                <select 
                  className="w-full bg-white border border-gray-200 text-gray-900 font-semibold text-sm rounded-xl px-4 py-3 shadow-sm focus:ring-2 outline-none transition-all"
                  style={{'--tw-ring-color': 'var(--color-primary)'}}
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Admin Remark</label>
                <textarea 
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 shadow-sm focus:ring-2 outline-none transition-all min-h-[100px]"
                  style={{'--tw-ring-color': 'var(--color-primary)'}}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Leave an official note for the salesman..."
                ></textarea>
              </div>
            </div>

            <div className="p-6 flex gap-3 border-t border-gray-100 bg-white">
              <button 
                onClick={() => setStatusModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button 
                onClick={submitStatusUpdate}
                className="flex-1 py-3 text-sm font-bold text-white rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50"
                style={{ background: "var(--color-primary)" }}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Status"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
