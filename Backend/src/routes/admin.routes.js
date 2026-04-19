import { Router } from "express";
import { adminAuth } from "../middleware/auth.middleware.js";
import { 
  getAllOrders,
  updateOrderStatus,
  getOrderByIdAdmin,
  deleteOrderAdmin,
  searchOrdersAdmin
} from "../controllers/admin.controller.js";

const router = Router();

// Base PATH: /api/admin

/**
 * GET /api/admin/all
 * Get all orders with pagination (admin only)
 */
router.get("/all", adminAuth, getAllOrders);

/**
 * GET /api/admin/search?q=partyName
 * Search orders globally
 */
router.get("/search", adminAuth, searchOrdersAdmin);

/**
 * GET /api/admin/orders/:id
 * Get details of any order
 */
router.get("/orders/:id", adminAuth, getOrderByIdAdmin);

/**
 * PUT /api/admin/orders/:id/status
 * Update status and add remark
 */
router.put("/orders/:id/status", adminAuth, updateOrderStatus);

/**
 * DELETE /api/admin/orders/:id
 * Delete any order globally, bypasses ownership checks
 */
router.delete("/orders/:id", adminAuth, deleteOrderAdmin);

export default router;