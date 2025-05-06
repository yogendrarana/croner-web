import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const VerificationTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  serialId: serial("serial_id").notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),

  // time
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type VerificationSelect = typeof VerificationTable.$inferSelect;
export type VerificationInsert = typeof VerificationTable.$inferInsert;
