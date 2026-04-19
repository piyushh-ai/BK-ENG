import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/upload.route.js";
import getStockRouter from "./routes/getStock.route.js";
import salesOrderRouter from "./routes/salesOrder.route.js";
import adminRouter from "./routes/admin.routes.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://bk-eng.onrender.com", credentials: true }));
app.use(morgan("dev"));



app.use("/api/auth", authRouter);
app.use("/api/upload", router);
app.use("/api/getStock", getStockRouter);
app.use("/api/salesOrder", salesOrderRouter);
app.use("/api/admin", adminRouter);

app.get("/version", (req, res) => {
  res.json({ version: "2.0.2", updateUrl:"https://drive.google.com/file/d/1m2dMiizWBYThp9ku1k_ybMQLO3yKf5V1/view?usp=sharing", forceUpdate:true });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next();
});

const distPath = path.join(__dirname, "../dist");

/**
 * frontend linking
 */
app.use(express.static(distPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
