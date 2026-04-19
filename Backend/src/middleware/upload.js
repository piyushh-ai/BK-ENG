import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "BK-ENG/salesOrder",

      // unique file name (important)
      public_id: `${Date.now()}-${file.originalname}`,

      // allowed formats
      allowed_formats: ["jpg", "png", "jpeg", "webp"],

      // auto optimization (UX boost)
      transformation: [
        {
          width: 1000,
          crop: "limit",
          quality: "auto",
        },
      ],
    };
  },
});

const upload = multer({
  storage,

  // optional: file size limit (2MB example)
  limits: { fileSize: 10 * 1024 * 1024 },

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
