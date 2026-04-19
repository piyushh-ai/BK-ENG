import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in env variable");
}

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in env variable");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in env variable");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not defined in env variable");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not defined in env variable");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not defined in env variable");
}

export const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
