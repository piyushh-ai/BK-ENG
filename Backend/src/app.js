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

// Required for ECS + ALB: trust the load balancer's forwarded headers
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://BK-ENG-ALB-1130725411.ap-south-1.elb.amazonaws.com" || "https://bk-eng.onrender.com",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/upload", router);
app.use("/api/getStock", getStockRouter);
app.use("/api/salesOrder", salesOrderRouter);
app.use("/api/admin", adminRouter);

app.get("/version", (req, res) => {
  res.json({
    version: "2.0.3",
    updateUrl:
      "https://drive.google.com/file/d/1aaOhI0ATH80_R8V8nfJLhCbyxVSFMBlZ/view?usp=sharing",
    forceUpdate: true,
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.status(200).send("BK-ENG Backend is running");
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next();
});

const distPath = path.join(__dirname, "../dist");

/**
 * Serve frontend static files
 */
app.use(express.static(distPath));

app.get("/{*path}", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
