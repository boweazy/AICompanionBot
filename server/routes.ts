import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBotSchema, insertPostSchema, insertActivitySchema, insertCommentSchema } from "@shared/schema";
import { z } from "zod";
import { createChatSession, sendMessage, getChatSession, type ChatMessage } from "./ai-chat";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all bots for a user (hardcoded user ID 1 for demo)
  app.get("/api/bots", async (req, res) => {
    try {
      const bots = await storage.getBots(1);
      res.json(bots);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bots" });
    }
  });

  // Create a new bot
  app.post("/api/bots", async (req, res) => {
    try {
      const botData = insertBotSchema.parse({
        ...req.body,
        userId: 1, // Hardcoded user ID for demo
        stats: { postsCount: 0, engagementRate: 0, totalInteractions: 0 }
      });
      const bot = await storage.createBot(botData);
      res.json(bot);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid bot data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create bot" });
      }
    }
  });

  // Update a bot
  app.patch("/api/bots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const bot = await storage.updateBot(id, updates);
      if (!bot) {
        res.status(404).json({ error: "Bot not found" });
        return;
      }
      res.json(bot);
    } catch (error) {
      res.status(500).json({ error: "Failed to update bot" });
    }
  });

  // Delete a bot
  app.delete("/api/bots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBot(id);
      if (!success) {
        res.status(404).json({ error: "Bot not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete bot" });
    }
  });

  // Get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const posts = await storage.getPosts(limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Create a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create post" });
      }
    }
  });

  // Update post engagement (likes, comments, shares)
  app.patch("/api/posts/:id/engagement", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { likes, comments, shares } = req.body;
      const updates: any = {};
      if (likes !== undefined) updates.likes = likes;
      if (comments !== undefined) updates.comments = comments;
      if (shares !== undefined) updates.shares = shares;
      
      const post = await storage.updatePost(id, updates);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post engagement" });
    }
  });

  // Get activities (all or for specific bot)
  app.get("/api/activities", async (req, res) => {
    try {
      const botId = req.query.botId ? parseInt(req.query.botId as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getActivities(botId, limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Create a new activity
  app.post("/api/activities", async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid activity data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create activity" });
      }
    }
  });

  // Get comments for a post
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getComments(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Create a new comment
  app.post("/api/comments", async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(commentData);
      
      // Update comment count for the post
      const post = await storage.getPost(commentData.postId);
      if (post) {
        await storage.updatePost(commentData.postId, { 
          comments: (post.comments || 0) + 1 
        });
      }
      
      res.json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid comment data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create comment" });
      }
    }
  });

  // Get dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const bots = await storage.getBots(1);
      const activities = await storage.getActivities();
      const posts = await storage.getPosts();
      
      const totalInteractions = bots.reduce((sum, bot) => {
        const stats = bot.stats as any;
        return sum + (stats.totalInteractions || 0);
      }, 0);
      
      const avgSuccessRate = bots.length > 0 ? 
        bots.reduce((sum, bot) => {
          const stats = bot.stats as any;
          return sum + (stats.engagementRate || stats.successRate || 0);
        }, 0) / bots.length : 0;
      
      const activeHours = bots.filter(bot => bot.isActive).length * 24;
      const costSavings = Math.floor(totalInteractions * 0.27); // Simulated cost savings
      
      res.json({
        totalInteractions,
        successRate: Math.round(avgSuccessRate * 10) / 10,
        activeHours: `${activeHours}h`,
        costSavings: `$${costSavings}`
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // AI Chat endpoints
  app.post("/api/chat/create", async (req, res) => {
    try {
      const sessionId = await createChatSession();
      const session = getChatSession(sessionId);
      res.json({ sessionId, messages: session?.messages || [] });
    } catch (error) {
      res.status(500).json({ error: "Failed to create chat session" });
    }
  });

  app.post("/api/chat/:sessionId/message", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const aiResponse = await sendMessage(sessionId, message);
      const session = getChatSession(sessionId);
      
      res.json({ 
        message: aiResponse,
        session: session ? { id: session.id, messages: session.messages } : null
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = getChatSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Chat session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to get chat session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
