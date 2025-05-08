import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, serial, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

import { CronjobTable } from './cronjob';
import { RoleEnum, UserStatusEnum } from '@/types/enums/user-enums';

// Create Postgres enums from TypeScript enums
export const roleEnum = pgEnum('role', Object.values(RoleEnum) as [string, ...string[]]);
export const userStatusEnum = pgEnum('user_status', Object.values(UserStatusEnum) as [string, ...string[]]);

// Users table with embedded addresses
export const UserTable = pgTable('user', {
  id: text('id').primaryKey(),
  serialId: serial('serial_id').notNull(),

  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: roleEnum('role').notNull().default(RoleEnum.CUSTOMER),
  status: userStatusEnum('user_status').default(UserStatusEnum.ACTIVE),
  emailVerified: boolean('email_verified').default(false),
  avatar: varchar('avatar', { length: 1000 }),
  phone: varchar('phone', { length: 20 }),
  isDeleted: boolean('is_deleted').default(false),
  lastLogin: timestamp('last_login'),

  // date
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// relations
export const userRelations = relations(UserTable, ({ many }) => ({
  cronjobs: many(CronjobTable),
}));

export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferInsert;
