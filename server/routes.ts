import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertContactMessageSchema, insertCommunityPostSchema, insertCommunityCommentSchema } from "../shared/schema.js";
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

  // Generate image for a single herb (admin/dev utility)
  app.post("/api/herbs/:id/generate-image", async (req, res) => {
    try {
      const { id } = req.params;
      // @ts-ignore - extended method on storage
      const result = await storage.generateHerbImage(id);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate herb image" });
    }
  });

  // Generate images for all herbs missing images
  app.post("/api/herbs/generate-images", async (req, res) => {
    try {
      const force = Boolean(req.query.force);
      // @ts-ignore - extended method on storage
      const summary = await storage.generateImagesForAllMissing(force);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate images" });
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
          errors: error.issues 
        });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Community routes
  // Get all community posts
  app.get("/api/community/posts", async (req, res) => {
    try {
      const posts = await storage.getAllCommunityPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch community posts" });
    }
  });

  // Get single community post
  app.get("/api/community/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getCommunityPost(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Create community post
  app.post("/api/community/posts", async (req, res) => {
    try {
      const validatedData = insertCommunityPostSchema.parse(req.body);
      const post = await storage.createCommunityPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid post data", 
          errors: error.issues 
        });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // Get comments for a post
  app.get("/api/community/posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await storage.getCommentsByPostId(id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Create comment
  app.post("/api/community/comments", async (req, res) => {
    try {
      const validatedData = insertCommunityCommentSchema.parse(req.body);
      const comment = await storage.createCommunityComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid comment data", 
          errors: error.issues 
        });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Like/unlike post
  app.post("/api/community/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      const { userEmail } = req.body;
      
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }

      const hasLiked = await storage.hasUserLikedPost(id, userEmail);
      if (hasLiked) {
        await storage.unlikePost(id, userEmail);
        res.json({ liked: false });
      } else {
        await storage.likePost(id, userEmail);
        res.json({ liked: true });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update like" });
    }
  });

  // Like/unlike comment
  app.post("/api/community/comments/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      const { userEmail } = req.body;
      
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }

      const hasLiked = await storage.hasUserLikedComment(id, userEmail);
      if (hasLiked) {
        await storage.unlikeComment(id, userEmail);
        res.json({ liked: false });
      } else {
        await storage.likeComment(id, userEmail);
        res.json({ liked: true });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update like" });
    }
  });

  // AI Wellness Assistant endpoint
  app.post("/api/ai/wellness", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Message is required" });
      }
      
      const response = await storage.getAIWellnessResponse(message);
      res.json(response);
    } catch (error) {
      console.error("AI wellness endpoint error:", error);
      res.status(500).json({ 
        response: "I'm experiencing technical difficulties right now. Please try again later.",
        suggestions: [
          "What specific symptoms are you experiencing?",
          "Are you currently taking any medications?",
          "What's your primary wellness goal?"
        ]
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
