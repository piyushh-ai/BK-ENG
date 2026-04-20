import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { getAdmin, getAllUsers, getSales, login, register, updateRole, updateFcmToken, forgetPassword, resetPassword } from "../controllers/auth.controller.js";
import { adminAuth, isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", loginValidator, login);

/**
 * @route GET /api/auth/admin/me
 * @desc Get current user
 * @access Private
 */
authRouter.get("/admin/me", adminAuth, getAdmin);

/**
 * @route GET /api/auth/user/me
 * @desc Get current user
 * @access Private
 */
authRouter.get("/user/me", isAuthenticated, getSales);

/**
 * @route PUT /api/auth/update-role
 * @desc Update user role
 * @access Private
 */
authRouter.put("/update-role", adminAuth, updateRole);

/**
 * @route GET /api/auth/all-users
 * @desc Get all users
 * @access Private
 */
authRouter.get("/all-users", adminAuth, getAllUsers);

/**
 * @route POST /api/auth/fcm-token
 * @desc Update user FCM token
 * @access Private
 */
authRouter.post("/fcm-token", isAuthenticated, updateFcmToken);

/**
 * @route POST /api/auth/forget-password
 * @desc Forget password
 * @access Public
 */
authRouter.post("/forget-password", forgetPassword);

/**
 * @route POST /api/auth/reset-password
 * @desc Reset password with token
 * @access Public
 */
authRouter.post("/reset-password", resetPassword);

export default authRouter;
