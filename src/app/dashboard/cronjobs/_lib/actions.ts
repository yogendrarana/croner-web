'use server';

import { headers } from 'next/headers';
import { eq, inArray } from 'drizzle-orm';
import { CronExpressionParser } from 'cron-parser';
import { revalidatePath, revalidateTag, unstable_noStore } from 'next/cache';

import db from '@/server/db';
import { auth } from '@/lib/auth/auth';
import { generateRandomId } from '@/lib/utils';
import { ApiResponse } from '@/types/response';
import { CronJobStatus } from '@/const/cronjob';
import { CronJobTable } from '@/server/db/schema';
import { CreateCronJobSchema, TCreateCronJobSchema } from './validations';

export const createCronjob = async (cronjob: TCreateCronJobSchema): Promise<ApiResponse> => {
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
  const parsedJob = CreateCronJobSchema.safeParse(cronjob);
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
    const nextRun = interval.next().toDate();

    // insert the cronjob into the database
    await db.insert(CronJobTable).values({
      id: generateRandomId(32),
      name: job.name,
      url: job.url,
      description: job.description ?? null,
      schedule: job.schedule,
      timezone: job.timezone,
      active: job.active,
      status: CronJobStatus.ENABLED,
      lastRun: null,
      lastRunStatus: null,
      nextRun,
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
    revalidateTag(`dashboard-${session.user.id}`);
    
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

// single cronjob update

// bulk cronjobs update
export const updateCronJobs = async (id: number, job: TCreateCronJobSchema): Promise<ApiResponse> => {
  revalidatePath('/dashboard/cnojobs');
  return {
    success: true,
    message: 'Cronjob updated successfully!',
  };
};

// single cronjob delete
export const deleteCronJob = async (input: { id: string }): Promise<ApiResponse> => {
  unstable_noStore();
  try {
    await db.transaction(async tx => {
      await tx.delete(CronJobTable).where(eq(CronJobTable.id, input.id));
    });

    revalidateTag('cronjobs');

    return {
      success: true,
      message: 'Cronjob deleted successfully!',
      data: null,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to delete cronjob',
      data: null,
    };
  }
};

// bulk cronjobs delete
export const deleteCronJobs = async (input: { ids: string[] }): Promise<ApiResponse> => {
  unstable_noStore();
  try {
    await db.transaction(async tx => {
      await tx.delete(CronJobTable).where(inArray(CronJobTable.id, input.ids));
    });

    revalidateTag('cronjobs');

    return {
      success: true,
      message: 'Cronjobs deleted successfully!',
      data: null,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to delete cronjobs',
      data: null,
    };
  }
};
