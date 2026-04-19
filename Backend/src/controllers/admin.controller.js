import salesOrderModel from "../models/salesOrder.model.js";
import { buildPagination, destroyCloudinaryImages } from "./salesOrder.controller.js";

// ═════════════════════════════════════════════════════════════
// GET ALL ORDERS  (admin only)
// GET /api/admin/all
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const getAllOrders = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      salesOrderModel
        .find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      salesOrderModel.countDocuments(),
    ]);

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// UPDATE ORDER STATUS & REMARK (admin only)
// PUT /api/admin/orders/:id/status
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, remark } = req.body;
    
    const validStatuses = ["pending", "completed", "cancelled", "partial"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    const order = await salesOrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) order.status = status;
    if (remark !== undefined) order.remark = remark.trim();

    await order.save();

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid order ID" });
    console.error("Error in updateOrderStatus:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// GET ORDER BY ID (admin only)
// GET /api/admin/orders/:id
// Access: Private (admin) - Can view any order
// ═════════════════════════════════════════════════════════════
export const getOrderByIdAdmin = async (req, res) => {
  try {
    const order = await salesOrderModel.findById(req.params.id).populate("user", "name email");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid order ID" });
    console.error("Error in getOrderByIdAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// DELETE ORDER (admin only)
// DELETE /api/admin/orders/:id
// Access: Private (admin) - Can delete ANY order universally
// ═════════════════════════════════════════════════════════════
export const deleteOrderAdmin = async (req, res) => {
  try {
    const order = await salesOrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Admin deletion (no status checks/owner checks)
    await destroyCloudinaryImages(order.images);
    await order.deleteOne();

    return res.status(200).json({ message: "Order deleted successfully by Admin" });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid order ID" });
    console.error("Error in deleteOrderAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// SEARCH ORDERS GLOBALLY (admin only)
// GET /api/admin/search?q=partyName
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const searchOrdersAdmin = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();

    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeQ, "i");

    const orders = await salesOrderModel
      .find({ partyName: { $regex: regex } })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.status(200).json({
      message: "Admin search completed",
      orders,
    });
  } catch (error) {
    console.error("Error in searchOrdersAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};