import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

import { CronJobTable } from './cronjob';

// Enums
export const executionStatusEnum = pgEnum('execution_status', ['success', 'failed', 'timeout', 'error']);

export const JobExecutionTable = pgTable('job_execution', t => ({
  id: t.text('id').primaryKey(),
  serialId: t.serial('serial_id').notNull(),
  cronJobId: t.text('cron_job_id').notNull().references(() => CronJobTable.id, { onDelete: 'cascade' }),
  
  // Execution Details
  status: executionStatusEnum('status').notNull(),
  startedAt: t.timestamp('started_at', { withTimezone: true }).notNull(),
  completedAt: t.timestamp('completed_at', { withTimezone: true }),
  
  // Performance Metrics
  responseTime: t.integer('response_time'), // Time to first byte in milliseconds
  duration: t.integer('duration'), // Total execution time in milliseconds
  
  // Response Details
  statusCode: t.integer('status_code'),
  responseBody: t.text('response_body'),
  errorMessage: t.text('error_message'),
  
  // Retry Info
  retryCount: t.integer('retry_count').default(0),
  isRetry: t.boolean('is_retry').default(false),
  
  // Timestamps
  createdAt: t.timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: t.timestamp('updated_at', { withTimezone: true }).defaultNow(),
}));

// relations
export const jobExecutionRelations = relations(JobExecutionTable, ({ one }) => ({
  cronJob: one(CronJobTable, {
    fields: [JobExecutionTable.cronJobId],
    references: [CronJobTable.id],
  }),
}));

// types
export type JobExecutionSelect = typeof JobExecutionTable.$inferSelect;
export type JobExecutionInsert = typeof JobExecutionTable.$inferInsert; 