import { Router } from "express";
import { isAuthenticated, adminAuth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  deleteOrder,
  searchMyOrders,
} from "../controllers/salesOrder.controller.js";

const router = Router();

// ── Public-ish static routes first (before /:id dynamic routes) ──────────────

/**
 * POST /api/salesOrder/create
 * Create a new sales order with up to 7 images
 * Access: Private
 */
router.post("/create", isAuthenticated, upload.array("images", 7), createOrder);

/**
 * GET /api/salesOrder/all
 * Get all orders with pagination (admin only)
 * Access: Admin
 */
router.get("/all", adminAuth, getAllOrders);

/**
 * GET /api/salesOrder/my
 * Get logged-in user's own orders with pagination
 * Access: Private
 */
router.get("/my", isAuthenticated, getMyOrders);

/**
 * GET /api/salesOrder/search?q=partyName
 * Search user's own orders by party name
 * Access: Private
 */
router.get("/search", isAuthenticated, searchMyOrders);

// ── Dynamic :id routes last — prevents static routes being caught as :id ──────

/**
 * GET /api/salesOrder/:id
 * Get a single order's full detail
 * Salesman: own orders only | Admin: any order
 * Access: Private
 */
router.get("/:id", isAuthenticated, getOrderById);

/**
 * DELETE /api/salesOrder/:id
 * Delete own order — blocked if status is not "pending"
 * Access: Private
 */
router.delete("/:id", isAuthenticated, deleteOrder);

export default router;
