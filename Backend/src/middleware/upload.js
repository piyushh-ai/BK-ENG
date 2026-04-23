import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "BK-ENG/salesOrder",

      // Unique file name
      public_id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

      // Allowed formats
      allowed_formats: ["jpg", "png", "jpeg", "webp"],

      // Single lightweight transformation on upload — no eager variants needed.
      // The client already compresses to 900px / 72% quality before sending,
      // so we just set a generous ceiling here to catch large originals.
      transformation: [
        {
          width: 1200,
          crop: "limit",
          quality: "auto:good", // Cloudinary's smart quality — faster than "auto"
          fetch_format: "auto",  // Serve webp/avif automatically
        },
      ],
    };
  },
});

const upload = multer({
  storage,

  // 8 MB per file (client already compressed, 10 MB was overkill)
  limits: { fileSize: 8 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default upload;
