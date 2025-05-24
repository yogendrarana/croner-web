import 'server-only';

import { and, count, desc, eq, sql, gte } from 'drizzle-orm';
import { headers } from 'next/headers';

import db from '@/server/db';
import { auth } from '@/lib/auth/auth';
import { CronJobTable, JobExecutionTable } from '@/server/db/schema';
import { unstable_cache } from '@/lib/unstable-cache';

export const getDashboardData = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
      payload: null,
    };
  }

  return await unstable_cache(
    async () => {
      try {
        const getTotalCronJobs = db.select({ count: count() }).from(CronJobTable).where(eq(CronJobTable.userId, session.user.id));
        const getActiveCronJobs = db
          .select({ count: count() })
          .from(CronJobTable)
          .where(and(eq(CronJobTable.userId, session.user.id), eq(CronJobTable.status, 'enabled')));
        const getFaileCronJobs = db
          .select({ count: count() })
          .from(CronJobTable)
          .where(and(eq(CronJobTable.userId, session.user.id), eq(CronJobTable.lastRunStatus, 'failed')));
        const getRecentCronJobs = db
          .select()
          .from(CronJobTable)
          .where(eq(CronJobTable.userId, session.user.id))
          .orderBy(desc(CronJobTable.lastRun))
          .limit(5);

        const [totalCronJobs, totalActiveJobs, totalFailedJobs, recentCronJobs] = await Promise.all([
          getTotalCronJobs,
          getActiveCronJobs,
          getFaileCronJobs,
          getRecentCronJobs,
        ]);

        return {
          success: true,
          message: 'Dashboard data fetched successfully',
          payload: {
            totalCronJobs: totalCronJobs[0].count,
            totalActiveJobs: totalActiveJobs[0].count,
            totalFailedJobs: totalFailedJobs[0].count,
            recentCronJobs,
          },
        };
      } catch (err: any) {
        return {
          success: false,
          message: err?.message || 'Failed to fetch dashboard data',
          payload: null,
        };
      }
    },
    [`dashboard-user-${session.user.id}`],
    {
      tags: [`dashboard-${session.user.id}`],
    },
  )();
};

export const getMetricsData = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
      payload: null,
    };
  }

  return await unstable_cache(
    async () => {
      try {
        // Get total executions in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const getTotalExecutions = db
          .select({ count: count() })
          .from(JobExecutionTable)
          .where(
            and(
              eq(JobExecutionTable.cronJobId, CronJobTable.id),
              eq(CronJobTable.userId, session.user.id),
              gte(JobExecutionTable.startedAt, thirtyDaysAgo),
            ),
          );

        // Get failed executions in last 30 days
        const getFailedExecutions = db
          .select({ count: count() })
          .from(JobExecutionTable)
          .where(
            and(
              eq(JobExecutionTable.cronJobId, CronJobTable.id),
              eq(CronJobTable.userId, session.user.id),
              gte(JobExecutionTable.startedAt, thirtyDaysAgo),
              eq(JobExecutionTable.status, 'failed'),
            ),
          );

        // Get average response time and duration
        const getPerformanceMetrics = db
          .select({
            avgResponseTime: sql<number>`avg(${JobExecutionTable.responseTime})`,
            avgDuration: sql<number>`avg(${JobExecutionTable.duration})`,
          })
          .from(JobExecutionTable)
          .innerJoin(CronJobTable, eq(JobExecutionTable.cronJobId, CronJobTable.id))
          .where(
            and(
              eq(CronJobTable.userId, session.user.id),
              gte(JobExecutionTable.startedAt, thirtyDaysAgo),
            ),
          );

        const [totalExecutions, failedExecutions, performanceMetrics] = await Promise.all([
          getTotalExecutions,
          getFailedExecutions,
          getPerformanceMetrics,
        ]);

        const successRate = totalExecutions[0].count > 0 
          ? ((totalExecutions[0].count - failedExecutions[0].count) / totalExecutions[0].count) * 100 
          : 0;

        return {
          success: true,
          message: 'Metrics data fetched successfully',
          payload: {
            totalExecutions: totalExecutions[0].count,
            failedExecutions: failedExecutions[0].count,
            successRate: Number(successRate.toFixed(1)),
            avgResponseTime: Number(performanceMetrics[0].avgResponseTime?.toFixed(0) || 0),
            avgDuration: Number(performanceMetrics[0].avgDuration?.toFixed(1) || 0),
          },
        };
      } catch (err: any) {
        return {
          success: false,
          message: err?.message || 'Failed to fetch metrics data',
          payload: null,
        };
      }
    },
    [`metrics-user-${session.user.id}`],
    {
      tags: [`metrics-${session.user.id}`],
    },
  )();
};
