import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw Error("Database url not available");
}

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/lib/db/schemas/*",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    prefix: "timestamp",
    table: "__migrations",
    schema: "public",
  },
});
