import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/infrastructure/database/schema.ts",
  out: "./src/server/infrastructure/database/migrations",
  dbCredentials: { url: process.env.MESA_DATABASE_PATH ?? "./data/mesa.db" },
});
