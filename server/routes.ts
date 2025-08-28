import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all herbs
  app.get("/api/herbs", async (req, res) => {
    try {
      const herbs = await storage.getAllHerbs();
      res.json(herbs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch herbs" });
    }
  });

  // Get herbs by category
  app.get("/api/herbs/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const herbs = await storage.getHerbsByCategory(category);
      res.json(herbs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch herbs by category" });
    }
  });

  // Search herbs
  app.get("/api/herbs/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const herbs = await storage.searchHerbs(q);
      res.json(herbs);
    } catch (error) {
      res.status(500).json({ message: "Failed to search herbs" });
    }
  });

  // Get single herb
  app.get("/api/herbs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const herb = await storage.getHerb(id);
      if (!herb) {
        return res.status(404).json({ message: "Herb not found" });
      }
      res.json(herb);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch herb" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
