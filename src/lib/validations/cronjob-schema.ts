import * as z from 'zod';

export const CronJobSchema = z.object({
  name: z.string().min(1, 'Job name is required'),
  url: z.string().url('Invalid URL'),
  description: z.string().optional(),

  // Schedule Config
  schedule: z.string().min(1, 'Schedule is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  active: z.boolean(),

  // Execution Tracking
  nextRunAt: z.date().optional(),

  // Optional HTTP Options
  httpMethod: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  httpHeaders: z.record(z.string(), z.any()).optional(),
  httpBody: z.union([z.record(z.string(), z.any()), z.array(z.any())]).optional(),
  httpAuthUsername: z.string().optional(),
  httpAuthPassword: z.string().optional(),

  notifyOnFailure: z.boolean(),
  notifyOnSuccessAfterFailure: z.boolean(),

  // Retry & Timeout
  maxRetries: z.number().min(0).max(10),
  timeoutSeconds: z.number().min(1).max(300),
});
