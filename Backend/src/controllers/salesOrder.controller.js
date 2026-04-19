import salesOrderModel from "../models/salesOrder.moel.js";
import cloudinary from "../config/cloudinary.js";

// ─────────────────────────────────────────────────────────────
// Helper: build pagination metadata (DRY — used in all lists)
// ─────────────────────────────────────────────────────────────
const buildPagination = (total, page, limit) => ({
  total,
  totalPages: Math.ceil(total / limit),
  currentPage: page,
  pageSize: limit,
  hasNextPage: page < Math.ceil(total / limit),
  hasPrevPage: page > 1,
});

// ─────────────────────────────────────────────────────────────
// Helper: remove images from Cloudinary
//   • Pass req.files  (multer upload failure rollback)
//   • Pass order.images (stored documents on order delete)
// ─────────────────────────────────────────────────────────────
const destroyCloudinaryImages = async (images = []) => {
  if (!images.length) return;

  const publicIds = images.map((img) =>
    // req.files  → img.filename
    // order.images → img.publicId
    img.publicId ?? img.filename
  );

  await Promise.allSettled(
    publicIds.map((id) => cloudinary.uploader.destroy(id))
  );
};

// ═════════════════════════════════════════════════════════════
// CREATE ORDER
// POST /api/salesOrder/create
// Access: Private (any authenticated user)
// ═════════════════════════════════════════════════════════════
export const createOrder = async (req, res) => {
  try {
    const { partyName, description } = req.body;

    // ── Validate required fields ──────────────────────────────
    if (!partyName?.trim()) {
      await destroyCloudinaryImages(req.files);
      return res.status(400).json({ message: "Party name is required" });
    }

    // ── Build images array from multer-cloudinary upload ──────
    // file.path     → secure Cloudinary URL
    // file.filename → public_id (for future deletion)
    const images = (req.files || []).map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    // ── Persist order ─────────────────────────────────────────
    const order = await salesOrderModel.create({
      partyName: partyName.trim(),
      description: description?.trim() || "",
      images,
      user: req.user._id,
      // status defaults to "pending" via schema
    });

    return res.status(201).json({
      message: "Sales order created successfully",
      order,
    });
  } catch (error) {
    // Rollback: delete uploaded images if DB write failed
    await destroyCloudinaryImages(req.files);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    console.error("Error in createOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// GET ALL ORDERS  (admin only)
// GET /api/salesOrder/all
// Access: Private (admin)
// ═════════════════════════════════════════════════════════════
export const getAllOrders = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10); // cap at 100
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
// GET MY ORDERS  (logged-in user's own orders)
// GET /api/salesOrder/my
// Access: Private (any authenticated user)
// ═════════════════════════════════════════════════════════════
export const getMyOrders = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const filter = { user: req.user._id };

    const [orders, total] = await Promise.all([
      salesOrderModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      salesOrderModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      message: "Your orders fetched successfully",
      orders,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error in getMyOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// GET ORDER BY ID  (single order detail)
// GET /api/salesOrder/:id
// Access: Private — salesman sees only own orders, admin sees all
// ═════════════════════════════════════════════════════════════
export const getOrderById = async (req, res) => {
  try {
    const order = await salesOrderModel
      .findById(req.params.id)
      .populate("user", "name email")
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = order.user._id.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "Forbidden: you can only view your own orders",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    console.error("Error in getOrderById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ═════════════════════════════════════════════════════════════
// DELETE ORDER
// DELETE /api/salesOrder/:id
// Access: Private — only order owner, only when status = "pending"
// ═════════════════════════════════════════════════════════════
export const deleteOrder = async (req, res) => {
  try {
    const order = await salesOrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ownership check
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden: you can only delete your own orders",
      });
    }

    // Status guard — only pending orders can be deleted
    if (order.status !== "pending") {
      return res.status(403).json({
        message: `Order cannot be deleted. Current status is "${order.status}". Only pending orders can be deleted.`,
      });
    }

    // Remove Cloudinary images before deleting the document
    await destroyCloudinaryImages(order.images);

    await order.deleteOne();

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    console.error("Error in deleteOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
