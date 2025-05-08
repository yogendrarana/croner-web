import { z } from 'zod';
import { CronJobStatus } from '@/const/cronjob';
import { CronJobSchema } from '@/lib/validations/cronjob-schema';

export type TCronJob = z.infer<typeof CronJobSchema>;
export type TCronJobStatus = (typeof CronJobStatus)[keyof typeof CronJobStatus];

// Create a type for TanStack Table
export type TanStackTableCronJob = Partial<TCronJob> & {
  id: number;
  status: TCronJobStatus;
  created_at: Date | string;
  lastRun: Date | string;
  nextRun: Date | string;
  url: string;
  name: string;
  schedule: string;
  active: boolean;
};
