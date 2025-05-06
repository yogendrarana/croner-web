'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { CronExpressionParser } from 'cron-parser';

import db from '../db';
import { auth } from '../auth/auth';
import { ApiResponse } from '@/types/response';
import { CronjobTable } from '../db/schemas/cronjob';
import { CronjobStatus } from '@/const/cronjob';
import { CronJobSchema } from '../validations/cronjob-schema';
import { generateRandomId } from '../utils';

type TypeCronjob = z.infer<typeof CronJobSchema>;

export const createCronjob = async (cronjob: TypeCronjob): Promise<ApiResponse> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  // validate cronjob data
  const parsedJob = CronJobSchema.safeParse(cronjob);
  if (!parsedJob.success) {
    return {
      success: false,
      message: 'Invalid cronjob data',
    };
  }

  const job = parsedJob.data;

  try {
    // Calculate next run time
    const interval = CronExpressionParser.parse(job.schedule, {
      tz: job.timezone ?? 'UTC',
    });
    const nextRunAt = interval.next().toDate();

    // insert the cronjob into the database
    await db.insert(CronjobTable).values({
      id: generateRandomId(32),
      name: job.name,
      url: job.url,
      description: job.description ?? null,
      schedule: job.schedule,
      timezone: job.timezone,
      active: job.active,
      status: CronjobStatus.PENDING,
      lastRunAt: null,
      lastRunStatus: null,
      nextRunAt,
      maxRetries: job.maxRetries,
      timeoutSeconds: job.timeoutSeconds,
      notifyOnFailure: job.notifyOnFailure,
      notifyOnSuccessAfterFailure: job.notifyOnSuccessAfterFailure,
      httpMethod: job.httpMethod,
      httpHeaders: job.httpHeaders ?? null,
      httpBody: job.httpBody ?? null,
      httpAuthUsername: job.httpAuthUsername ?? null,
      httpAuthPassword: job.httpAuthPassword ?? null,
      userId: session.user.id,
    });

    revalidatePath('/dashboard/cronjobs');
    return {
      success: true,
      message: 'Cronjob created successfully!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Invalid cron schedule format',
    };
  }
};

export const updateCronJob = async (id: number, job: TypeCronjob): Promise<ApiResponse> => {
  revalidatePath('/dashboard/cnojobs');
  return {
    success: true,
    message: 'Cronjob updated successfully!',
  };
};
