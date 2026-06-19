import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import apiRoutes from "./src/routes/index.js";
import { sitemapState } from "./src/utils/sitemapCache.js";

// ─── Load env vars ────────────────────────────────────────────────────────────
dotenv.config();

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

const app = express();

const SITE_URL = process.env.FRONTEND_URL || "https://inquisitivedigital.com";
const SITEMAP_CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      // Add production domain here when deployed
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (resumes)
app.use("/uploads", express.static("uploads"));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Inquisitive Digital API is running",
    version: "1.0.0",
  });
});

// ─── Sitemap ──────────────────────────────────────────────────────────────────
app.get("/sitemap.xml", async (req, res) => {
  try {
    const now = Date.now();

    // Serve from cache if still fresh
    if (sitemapState.cache && (now - sitemapState.cacheTime) < SITEMAP_CACHE_TTL_MS) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.send(sitemapState.cache);
    }

    // Lazy-import models after DB is connected to avoid issues at startup
    const { default: Blog } = await import("./src/models/Blog.js");
    const { default: Service } = await import("./src/models/Service.js");

    const staticUrls = [
      { loc: `${SITE_URL}/`,           changefreq: "weekly",  priority: "1.0" },
      { loc: `${SITE_URL}/services`,   changefreq: "weekly",  priority: "0.9" },
      { loc: `${SITE_URL}/blogs`,      changefreq: "daily",   priority: "0.8" },
      { loc: `${SITE_URL}/about-us`,   changefreq: "monthly", priority: "0.7" },
      { loc: `${SITE_URL}/careers`,    changefreq: "monthly", priority: "0.7" },
      { loc: `${SITE_URL}/contact-us`, changefreq: "monthly", priority: "0.7" },
    ];

    const [blogs, services] = await Promise.all([
      Blog.find({ isActive: true }, "slug updatedAt").lean(),
      Service.find({ isActive: true }, "slug updatedAt").lean(),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const addUrl = (url, changefreq, priority, lastmod) => {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      if (lastmod) xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    };

    staticUrls.forEach(u => addUrl(u.loc, u.changefreq, u.priority, new Date()));
    services.forEach(s => addUrl(`${SITE_URL}/services/${s.slug}`, "weekly", "0.9", s.updatedAt));
    blogs.forEach(b => addUrl(`${SITE_URL}/blogs/${b.slug}`, "weekly", "0.7", b.updatedAt));

    xml += `</urlset>`;

    sitemapState.cache = xml;
    sitemapState.cacheTime = now;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.send(xml);
  } catch (err) {
    console.error("Sitemap generation error:", err.message);
    return res.status(500).send("Error generating sitemap");
  }
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api", apiRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`   http://localhost:${PORT}\n`);
});
