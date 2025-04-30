import { User } from './user';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Session = pgTable('session', {
  id: text('id').primaryKey(),
  serialId: serial('serial_id').notNull(),

  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),

  // date
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull(),
});

// type
export type SessionSelect = typeof Session.$inferSelect;
export type SessionInsert = typeof Session.$inferInsert;
