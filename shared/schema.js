"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCommunityLikeSchema = exports.insertCommunityCommentSchema = exports.insertCommunityPostSchema = exports.insertContactMessageSchema = exports.insertHerbSchema = exports.insertUserSchema = exports.communityLikes = exports.communityComments = exports.communityPosts = exports.contactMessages = exports.herbs = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.herbs = (0, pg_core_1.pgTable)("herbs", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    localName: (0, pg_core_1.text)("local_name"),
    emoji: (0, pg_core_1.text)("emoji"),
    description: (0, pg_core_1.text)("description").notNull(),
    benefits: (0, pg_core_1.jsonb)("benefits").$type().notNull(),
    categories: (0, pg_core_1.jsonb)("categories").$type().notNull(),
    preparationMethods: (0, pg_core_1.jsonb)("preparation_methods").$type().notNull(),
    safetyInfo: (0, pg_core_1.text)("safety_info"),
    imageUrl: (0, pg_core_1.text)("image_url"),
    isIndigenous: (0, pg_core_1.text)("is_indigenous").notNull().default("false"),
    region: (0, pg_core_1.text)("region"),
});
exports.contactMessages = (0, pg_core_1.pgTable)("contact_messages", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    subject: (0, pg_core_1.text)("subject"),
    message: (0, pg_core_1.text)("message").notNull(),
    createdAt: (0, pg_core_1.text)("created_at").notNull().default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
});
exports.communityPosts = (0, pg_core_1.pgTable)("community_posts", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    authorName: (0, pg_core_1.text)("author_name").notNull(),
    authorEmail: (0, pg_core_1.text)("author_email").notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    category: (0, pg_core_1.text)("category").notNull(), // 'success-story', 'journey', 'question', 'tip'
    tags: (0, pg_core_1.jsonb)("tags").$type().notNull().default([]),
    imageUrl: (0, pg_core_1.text)("image_url"),
    likes: (0, pg_core_1.text)("likes").notNull().default("0"),
    views: (0, pg_core_1.text)("views").notNull().default("0"),
    isApproved: (0, pg_core_1.text)("is_approved").notNull().default("false"),
    createdAt: (0, pg_core_1.text)("created_at").notNull().default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.text)("updated_at").notNull().default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
});
exports.communityComments = (0, pg_core_1.pgTable)("community_comments", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    postId: (0, pg_core_1.varchar)("post_id").references(() => exports.communityPosts.id).notNull(),
    authorName: (0, pg_core_1.text)("author_name").notNull(),
    authorEmail: (0, pg_core_1.text)("author_email").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    likes: (0, pg_core_1.text)("likes").notNull().default("0"),
    isApproved: (0, pg_core_1.text)("is_approved").notNull().default("false"),
    createdAt: (0, pg_core_1.text)("created_at").notNull().default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
});
exports.communityLikes = (0, pg_core_1.pgTable)("community_likes", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    postId: (0, pg_core_1.varchar)("post_id").references(() => exports.communityPosts.id),
    commentId: (0, pg_core_1.varchar)("comment_id").references(() => exports.communityComments.id),
    userEmail: (0, pg_core_1.text)("user_email").notNull(),
    createdAt: (0, pg_core_1.text)("created_at").notNull().default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});
exports.insertHerbSchema = (0, drizzle_zod_1.createInsertSchema)(exports.herbs).omit({
    id: true,
});
exports.insertContactMessageSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contactMessages).omit({
    id: true,
    createdAt: true,
});
exports.insertCommunityPostSchema = (0, drizzle_zod_1.createInsertSchema)(exports.communityPosts).omit({
    id: true,
    likes: true,
    views: true,
    isApproved: true,
    createdAt: true,
    updatedAt: true,
});
exports.insertCommunityCommentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.communityComments).omit({
    id: true,
    likes: true,
    isApproved: true,
    createdAt: true,
});
exports.insertCommunityLikeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.communityLikes).omit({
    id: true,
    createdAt: true,
});
