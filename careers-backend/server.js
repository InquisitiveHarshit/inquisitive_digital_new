import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { connectDB } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import jobsRouter from "./src/routes/jobs.js";
import adminRouter from "./src/routes/admin.js";

// Load configurations
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Standard Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: false // Allows client to render downloaded files
  })
);

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Response Compression
app.use(compression());

// CORS Whitelists
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: [clientUrl, "http://localhost:3000"],
    credentials: true
  })
);

// Payload parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads as Static Folder
app.use("/uploads", express.static("uploads"));

// REST APIs
app.use("/api/jobs", jobsRouter);
app.use("/api/admin", adminRouter);

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Exception Filter
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Careers Backend server online on port ${PORT}`);
  console.log(`   http://localhost:${PORT}\n`);
});
export default app;
