import salesOrderModel from "../models/salesOrder.model.js";
import { buildPagination, destroyCloudinaryImages } from "./salesOrder.controller.js";
import xlsx from "xlsx";

// ═════════════════════════════════════════════════════════════
// GET ALL ORDERS  (admin only)
// GET /api/admin/all
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const getAllOrders = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(2000, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    // ── Date range filter ─────────────────────────────────────
    const filter = {};
    const { startDate, endDate } = req.query;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        // endDate inclusive: go to end of that day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const [orders, total] = await Promise.all([
      salesOrderModel
        .find(filter)
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      salesOrderModel.countDocuments(filter),
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

    const prevStatus = order.status;
    if (status) order.status = status;
    if (remark !== undefined) order.remark = remark.trim();

    // ── Push to statusHistory audit trail ────────────────────
    // Only log if something actually changed
    if ((status && status !== prevStatus) || remark !== undefined) {
      order.statusHistory.push({
        status: order.status,
        remark: order.remark,
        changedBy: req.user._id,
        changedByName: req.user.name || "",
      });
    }

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

// ═════════════════════════════════════════════════════════════
// EXPORT ALL ORDERS TO EXCEL (admin only)
// GET /api/admin/export
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const exportReport = async (req, res) => {
  try {
    const orders = await salesOrderModel
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const excelData = orders.map((order, index) => {
      const imageUrls = order.images?.length
        ? order.images.map((img) => img.url).join("\n")
        : "";

      return {
        "S.No": index + 1,
        "Order ID": order._id.toString(),
        "Party Name": order.partyName || "",
        "Salesman": order.user ? order.user.name : "Unknown",
        "Salesman Email": order.user ? order.user.email : "",
        "Status": order.status || "pending",
        "Description": order.description || "",
        "Remark": order.remark || "",
        "Images Count": order.images ? order.images.length : 0,
        "Image URLs": imageUrls,
        "Created At": new Date(order.createdAt).toLocaleString("en-IN"),
        "Updated At": new Date(order.updatedAt).toLocaleString("en-IN"),
      };
    });

    const worksheet = xlsx.utils.json_to_sheet(excelData);

    // Auto-fit columns
    const colWidths = [
      { wch: 6 },   // S.No
      { wch: 26 },  // Order ID
      { wch: 30 },  // Party Name
      { wch: 20 },  // Salesman
      { wch: 25 },  // Salesman Email
      { wch: 12 },  // Status
      { wch: 40 },  // Description
      { wch: 40 },  // Remark
      { wch: 12 },  // Images Count
      { wch: 80 },  // Image URLs
      { wch: 20 },  // Created At
      { wch: 20 },  // Updated At
    ];
    worksheet["!cols"] = colWidths;

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Orders");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", 'attachment; filename="orders_report.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    return res.status(200).send(buffer);
  } catch (error) {
    console.error("Error exporting report:", error);
    return res.status(500).json({ message: "Internal server error during export" });
  }
};