"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const storage_1 = require("./storage");
const schema_1 = require("../shared/schema");
const zod_1 = require("zod");
async function registerRoutes(app) {
    // Get all herbs
    app.get("/api/herbs", async (req, res) => {
        try {
            const herbs = await storage_1.storage.getAllHerbs();
            res.json(herbs);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch herbs" });
        }
    });
    // Get herbs by category
    app.get("/api/herbs/category/:category", async (req, res) => {
        try {
            const { category } = req.params;
            const herbs = await storage_1.storage.getHerbsByCategory(category);
            res.json(herbs);
        }
        catch (error) {
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
            const herbs = await storage_1.storage.searchHerbs(q);
            res.json(herbs);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to search herbs" });
        }
    });
    // Get single herb
    app.get("/api/herbs/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const herb = await storage_1.storage.getHerb(id);
            if (!herb) {
                return res.status(404).json({ message: "Herb not found" });
            }
            res.json(herb);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch herb" });
        }
    });
    // Submit contact form
    app.post("/api/contact", async (req, res) => {
        try {
            const validatedData = schema_1.insertContactMessageSchema.parse(req.body);
            const message = await storage_1.storage.createContactMessage(validatedData);
            res.status(201).json(message);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    message: "Invalid form data",
                    errors: error.errors
                });
            }
            res.status(500).json({ message: "Failed to submit contact form" });
        }
    });
    // Community routes
    // Get all community posts
    app.get("/api/community/posts", async (req, res) => {
        try {
            const posts = await storage_1.storage.getAllCommunityPosts();
            res.json(posts);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch community posts" });
        }
    });
    // Get single community post
    app.get("/api/community/posts/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const post = await storage_1.storage.getCommunityPost(id);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.json(post);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch post" });
        }
    });
    // Create community post
    app.post("/api/community/posts", async (req, res) => {
        try {
            const validatedData = schema_1.insertCommunityPostSchema.parse(req.body);
            const post = await storage_1.storage.createCommunityPost(validatedData);
            res.status(201).json(post);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    message: "Invalid post data",
                    errors: error.errors
                });
            }
            res.status(500).json({ message: "Failed to create post" });
        }
    });
    // Get comments for a post
    app.get("/api/community/posts/:id/comments", async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await storage_1.storage.getCommentsByPostId(id);
            res.json(comments);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch comments" });
        }
    });
    // Create comment
    app.post("/api/community/comments", async (req, res) => {
        try {
            const validatedData = schema_1.insertCommunityCommentSchema.parse(req.body);
            const comment = await storage_1.storage.createCommunityComment(validatedData);
            res.status(201).json(comment);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    message: "Invalid comment data",
                    errors: error.errors
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
            const hasLiked = await storage_1.storage.hasUserLikedPost(id, userEmail);
            if (hasLiked) {
                await storage_1.storage.unlikePost(id, userEmail);
                res.json({ liked: false });
            }
            else {
                await storage_1.storage.likePost(id, userEmail);
                res.json({ liked: true });
            }
        }
        catch (error) {
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
            const hasLiked = await storage_1.storage.hasUserLikedComment(id, userEmail);
            if (hasLiked) {
                await storage_1.storage.unlikeComment(id, userEmail);
                res.json({ liked: false });
            }
            else {
                await storage_1.storage.likeComment(id, userEmail);
                res.json({ liked: true });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Failed to update like" });
        }
    });
    // AI Routes
    app.post("/api/ai/herb-search", async (req, res) => {
        try {
            const { query } = req.body;
            if (!query) {
                return res.status(400).json({ error: "Query is required" });
            }
            // Use Gemini API to get herb information
            const herbInfo = await storage_1.storage.getAIHerbInfo(query);
            res.json(herbInfo);
        }
        catch (error) {
            console.error("AI herb search error:", error);
            res.status(500).json({ error: "Failed to get herb information" });
        }
    });
    app.post("/api/ai/wellness-chat", async (req, res) => {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }
            // Use Gemini API to get wellness advice
            const wellnessResponse = await storage_1.storage.getAIWellnessResponse(message);
            res.json(wellnessResponse);
        }
        catch (error) {
            console.error("AI wellness chat error:", error);
            res.status(500).json({ error: "Failed to get wellness response" });
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}
