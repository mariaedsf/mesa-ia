import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const restaurants = sqliteTable("restaurants", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  teamSize: integer("team_size").notNull(),
  stations: integer("stations").notNull(),
  teamExperience: integer("team_experience").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const menuItems = sqliteTable("menu_items", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  priceCents: integer("price_cents").notNull(),
  costCents: integer("cost_cents").notNull(),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const operationalOrders = sqliteTable("operational_orders", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  menuItemId: text("menu_item_id"),
  quantity: integer("quantity").notNull().default(1),
  orderedAt: integer("ordered_at", { mode: "timestamp" }).notNull(),
  revenueCents: integer("revenue_cents").notNull(),
  preparationMinutes: real("preparation_minutes").notNull(),
});

export const customerReviews = sqliteTable("customer_reviews", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  menuItemId: text("menu_item_id"),
  receivedAt: integer("received_at", { mode: "timestamp" }).notNull(),
  customer: text("customer").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  channel: text("channel").notNull(),
  answered: integer("answered", { mode: "boolean" }).notNull().default(false),
});

export const workspaceSettings = sqliteTable("workspace_settings", {
  id: integer("id").primaryKey(),
  restaurant: text("restaurant").notNull(),
});

export const recommendationStates = sqliteTable("recommendation_states", {
  id: text("id").primaryKey(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});

export const actionPlans = sqliteTable("action_plans", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  responsible: text("responsible").notNull(),
  role: text("role").notNull(),
  initials: text("initials").notNull(),
  due: text("due").notNull(),
  day: text("day").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status", {
    enum: ["active", "completed", "pending"],
  }).notNull(),
  icon: text("icon", {
    enum: ["chef", "clock", "message", "package", "star", "chart", "team", "calendar"],
  }).notNull(),
  overdue: integer("overdue", { mode: "boolean" }).notNull().default(false),
  source: text("source").notNull().default("manual"),
});

export const menuItemStates = sqliteTable("menu_item_states", {
  id: text("id").primaryKey(),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
});

export const reviewStates = sqliteTable("review_states", {
  id: text("id").primaryKey(),
  answered: integer("answered", { mode: "boolean" }).notNull().default(false),
});

export const diagnosticPlanItems = sqliteTable("diagnostic_plan_items", {
  recommendationId: text("recommendation_id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const simulationRuns = sqliteTable("simulation_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  inputs: text("inputs", { mode: "json" }).notNull(),
  results: text("results", { mode: "json" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const aiDashboardSummaries = sqliteTable("ai_dashboard_summaries", {
  inputHash: text("input_hash").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  summary: text("summary").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
