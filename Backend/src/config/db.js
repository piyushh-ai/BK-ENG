import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = () => {
  try {
    mongoose.connect(config.mongo_url);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
