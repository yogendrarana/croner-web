import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

import { UserTable } from './user';
import { JobExecutionTable } from './job-execution';

// Enums
export const httpMethodEnum = pgEnum('http_method', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
export const jobStatusEnum = pgEnum('job_status', ['enabled', 'disabled', 'paused']);
export const jobLastRunStatusEnum = pgEnum('last_run_status', ['success', 'failed']);

export const CronJobTable = pgTable('cronjob', t => ({
  id: t.text('id').primaryKey(),
  serialId: t.serial('serial_id').notNull(),

  // Basic Info
  name: t.text('name').notNull(),
  url: t.text('url').notNull(),
  description: t.text('description'),

  // Schedule Config
  schedule: t.text('schedule').notNull(),
  timezone: t.text('timezone').default('UTC'),
  active: t.boolean('active').notNull().default(true),

  // Execution Tracking
  status: jobStatusEnum('status'),
  lastRun: t.timestamp('last_run', { withTimezone: true }),
  lastRunStatus: jobLastRunStatusEnum('last_run_status'),
  nextRun: t.timestamp('next_run', { withTimezone: true }),

  // Retry & Timeout
  maxRetries: t.integer('max_retries').default(3),
  timeoutSeconds: t.integer('timeout_seconds').default(30),

  // Notification Options
  notifyOnFailure: t.boolean('notify_on_failure').default(true),
  notifyOnSuccessAfterFailure: t.boolean('notify_on_success_after_failure').default(false),

  // Optional HTTP Options
  httpMethod: httpMethodEnum('http_method').default('POST'),
  httpHeaders: t.jsonb('http_headers'),
  httpBody: t.jsonb('http_body'),
  httpAuthUsername: t.text('http_auth_username'),
  httpAuthPassword: t.text('http_auth_password'),

  // user info
  userId: t
    .text('user_id')
    .notNull()
    .references(() => UserTable.id, {
      onDelete: 'cascade',
    }),

  // Timestamps
  createdAt: t.timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: t.timestamp('updated_at', { withTimezone: true }).defaultNow(),
}));

// relations
export const cronjobRelations = relations(CronJobTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [CronJobTable.userId],
    references: [UserTable.id],
  }),
  executions: many(JobExecutionTable),
}));

// types
export type CronJobSelect = typeof CronJobTable.$inferSelect;
export type CronJobInsert = typeof CronJobTable.$inferInsert;
