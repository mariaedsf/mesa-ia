import "server-only";

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const databasePath =
  process.env.MESA_DATABASE_PATH?.trim() || path.join(process.cwd(), "data", "mesa.db");

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const sqlite = new Database(databasePath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    team_size INTEGER NOT NULL,
    stations INTEGER NOT NULL,
    team_experience INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    cost_cents INTEGER NOT NULL,
    available INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS operational_orders (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    menu_item_id TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    ordered_at INTEGER NOT NULL,
    revenue_cents INTEGER NOT NULL,
    preparation_minutes REAL NOT NULL
  );
  CREATE TABLE IF NOT EXISTS customer_reviews (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    menu_item_id TEXT,
    received_at INTEGER NOT NULL,
    customer TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    channel TEXT NOT NULL,
    answered INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS workspace_settings (
    id INTEGER PRIMARY KEY,
    restaurant TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS recommendation_states (
    id TEXT PRIMARY KEY,
    completed INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS action_plans (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    responsible TEXT NOT NULL,
    role TEXT NOT NULL,
    initials TEXT NOT NULL,
    due TEXT NOT NULL,
    day TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    icon TEXT NOT NULL,
    overdue INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'manual'
  );
  CREATE TABLE IF NOT EXISTS menu_item_states (
    id TEXT PRIMARY KEY,
    available INTEGER NOT NULL DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS review_states (
    id TEXT PRIMARY KEY,
    answered INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS diagnostic_plan_items (
    recommendation_id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS simulation_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inputs TEXT NOT NULL,
    results TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS ai_dashboard_summaries (
    input_hash TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

export const db = drizzle(sqlite, { schema });
