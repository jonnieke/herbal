import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Herb = typeof herbs.$inferSelect;
export type InsertHerb = z.infer<typeof insertHerbSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
