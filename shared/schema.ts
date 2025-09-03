import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const herbs = pgTable("herbs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  localName: text("local_name"),
  emoji: text("emoji"),
  description: text("description").notNull(),
  benefits: jsonb("benefits").$type<string[]>().notNull(),
  categories: jsonb("categories").$type<string[]>().notNull(),
  preparationMethods: jsonb("preparation_methods").$type<string[]>().notNull(),
  safetyInfo: text("safety_info"),
  imageUrl: text("image_url"),
  isIndigenous: text("is_indigenous").notNull().default("false"),
  region: text("region"),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const communityPosts = pgTable("community_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'success-story', 'journey', 'question', 'tip'
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
  likes: text("likes").notNull().default("0"),
  views: text("views").notNull().default("0"),
  isApproved: text("is_approved").notNull().default("false"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const communityComments = pgTable("community_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").references(() => communityPosts.id).notNull(),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email").notNull(),
  content: text("content").notNull(),
  likes: text("likes").notNull().default("0"),
  isApproved: text("is_approved").notNull().default("false"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const communityLikes = pgTable("community_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").references(() => communityPosts.id),
  commentId: varchar("comment_id").references(() => communityComments.id),
  userEmail: text("user_email").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Manual Zod schemas to replace drizzle-zod functionality
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertHerbSchema = z.object({
  name: z.string(),
  localName: z.string().optional(),
  emoji: z.string().optional(),
  description: z.string(),
  benefits: z.array(z.string()),
  categories: z.array(z.string()),
  preparationMethods: z.array(z.string()),
  safetyInfo: z.string().optional(),
  imageUrl: z.string().optional(),
  isIndigenous: z.string().default("false"),
  region: z.string().optional(),
});

export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string(),
});

export const insertCommunityPostSchema = z.object({
  authorName: z.string(),
  authorEmail: z.string().email(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().optional(),
});

export const insertCommunityCommentSchema = z.object({
  postId: z.string(),
  authorName: z.string(),
  authorEmail: z.string().email(),
  content: z.string(),
});

export const insertCommunityLikeSchema = z.object({
  postId: z.string().optional(),
  commentId: z.string().optional(),
  userEmail: z.string().email(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Herb = typeof herbs.$inferSelect;
export type InsertHerb = z.infer<typeof insertHerbSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = z.infer<typeof insertCommunityCommentSchema>;
export type CommunityLike = typeof communityLikes.$inferSelect;
export type InsertCommunityLike = z.infer<typeof insertCommunityLikeSchema>;
