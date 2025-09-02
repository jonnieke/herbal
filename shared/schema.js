import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const herbs = pgTable("herbs", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    localName: text("local_name"),
    emoji: text("emoji"),
    description: text("description").notNull(),
    benefits: jsonb("benefits").$type().notNull(),
    categories: jsonb("categories").$type().notNull(),
    preparationMethods: jsonb("preparation_methods").$type().notNull(),
    safetyInfo: text("safety_info"),
    imageUrl: text("image_url"),
    isIndigenous: text("is_indigenous").notNull().default("false"),
    region: text("region"),
});
export const contactMessages = pgTable("contact_messages", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message").notNull(),
    createdAt: text("created_at").notNull().default(sql `CURRENT_TIMESTAMP`),
});
export const communityPosts = pgTable("community_posts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    authorName: text("author_name").notNull(),
    authorEmail: text("author_email").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(), // 'success-story', 'journey', 'question', 'tip'
    tags: jsonb("tags").$type().notNull().default([]),
    imageUrl: text("image_url"),
    likes: text("likes").notNull().default("0"),
    views: text("views").notNull().default("0"),
    isApproved: text("is_approved").notNull().default("false"),
    createdAt: text("created_at").notNull().default(sql `CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql `CURRENT_TIMESTAMP`),
});
export const communityComments = pgTable("community_comments", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    postId: varchar("post_id").references(() => communityPosts.id).notNull(),
    authorName: text("author_name").notNull(),
    authorEmail: text("author_email").notNull(),
    content: text("content").notNull(),
    likes: text("likes").notNull().default("0"),
    isApproved: text("is_approved").notNull().default("false"),
    createdAt: text("created_at").notNull().default(sql `CURRENT_TIMESTAMP`),
});
export const communityLikes = pgTable("community_likes", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    postId: varchar("post_id").references(() => communityPosts.id),
    commentId: varchar("comment_id").references(() => communityComments.id),
    userEmail: text("user_email").notNull(),
    createdAt: text("created_at").notNull().default(sql `CURRENT_TIMESTAMP`),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const insertHerbSchema = createInsertSchema(herbs).omit({
    id: true,
});
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
    id: true,
    createdAt: true,
});
export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({
    id: true,
    likes: true,
    views: true,
    isApproved: true,
    createdAt: true,
    updatedAt: true,
});
export const insertCommunityCommentSchema = createInsertSchema(communityComments).omit({
    id: true,
    likes: true,
    isApproved: true,
    createdAt: true,
});
export const insertCommunityLikeSchema = createInsertSchema(communityLikes).omit({
    id: true,
    createdAt: true,
});
