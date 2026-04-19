import mongoose from "mongoose";
import { config } from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

export const connectDB = () => {
  try {
    mongoose.connect(config.mongo_url);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
