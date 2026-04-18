// routes/upload.route.js

import express from "express";
import multer from "multer";
import { uploadExcel } from "../controllers/upload.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });


/**
 * @route   POST /api/upload/upload-excel
 * @desc    Upload Excel files to the database.
 * @access  Private (Admin only)
 * @roles   admin
 * 
 * @requires body - files
 * @requires files - bosch, company
 * @requires auth - 
 */
router.post(
  "/upload-excel",
  upload.fields([       // 👈 IMPORTANT
    { name: "bosch", maxCount: 1 },
    { name: "company", maxCount: 1 },
  ]),
  adminAuth,
  uploadExcel
);


export default router;
