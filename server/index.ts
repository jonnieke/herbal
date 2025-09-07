import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes.js";
import { storage } from "./storage.js";
import { setupVite, serveStatic, log } from "./vite.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets with far-future cache
app.use(
  '/attached_assets',
  express.static(path.join(process.cwd(), 'attached_assets'), {
    maxAge: '30d',
    immutable: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    },
  }),
);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // For autoscale deployment, use port 80. Default to 80 if not specified.
    // this serves both the API and the client.
    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen({
      port,
      host: "0.0.0.0",
    }, () => {
      log(`serving on port ${port}`);
    });

    // Optionally generate herb images on startup using Gemini
    const shouldGenerate = process.env.GENERATE_HERB_IMAGES_ON_START === 'true';
    const force = process.env.GENERATE_HERB_IMAGES_FORCE === 'true';
    if (shouldGenerate) {
      setTimeout(async () => {
        try {
          // @ts-ignore extended method exists on storage
          const summary = await storage.generateImagesForAllMissing(force);
          log(`image-gen: generated=${summary.generated} skipped=${summary.skipped}`);
        } catch (err) {
          console.error('Failed to generate herb images:', err);
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
