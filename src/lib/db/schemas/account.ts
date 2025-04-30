import { User } from './user';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Account = pgTable('account', {
  id: text('id').primaryKey(),
  serialId: serial('serial_id').notNull(),

  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),

  // foreign keys
  userId: text('user_id')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),

  // time
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export type AccountSelect = typeof Account.$inferSelect;
export type AccountInsert = typeof Account.$inferInsert;
