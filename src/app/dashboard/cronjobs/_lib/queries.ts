import 'server-only';

export const revalidate = 0; // Disable caching completely

import { and, asc, count, desc, gte, ilike, inArray, lte } from 'drizzle-orm';

import db from '@/server/db';
import { unstable_cache } from '@/lib/unstable-cache';
import { CronJobTable } from '@/server/db/schemas/cronjob';
import { TGetCronJobsSearchParams } from '@/app/dashboard/cronjobs/_lib/search-params-schema';

export async function getCronJobs(input: TGetCronJobsSearchParams) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage;

        const where = and(
          input.name ? ilike(CronJobTable.name, `%${input.name}%`) : undefined,
          input.status.length > 0 ? inArray(CronJobTable.status, input.status) : undefined,
          input.createdAt.length > 0
            ? and(
                input.createdAt[0]
                  ? gte(
                      CronJobTable.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[0]);
                        date.setHours(0, 0, 0, 0);
                        return date;
                      })(),
                    )
                  : undefined,
                input.createdAt[1]
                  ? lte(
                      CronJobTable.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[1]);
                        date.setHours(23, 59, 59, 999);
                        return date;
                      })(),
                    )
                  : undefined,
              )
            : undefined,
        );

        const orderBy =
          input.sort.length > 0
            ? input.sort.map(item => (item.desc ? desc(CronJobTable[item.id]) : asc(CronJobTable[item.id])))
            : [asc(CronJobTable.createdAt)];

        const { data, total } = await db.transaction(async tx => {
          const data = await tx
            .select()
            .from(CronJobTable)
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy);

          const total = await tx
            .select({
              count: count(),
            })
            .from(CronJobTable)
            .where(where)
            .execute()
            .then(res => res[0]?.count ?? 0);

          return {
            data,
            total,
          };
        });

        const pageCount = Math.ceil(total / input.perPage);

        return {
          success: true,
          message: 'Cron jobs fetched successfully',
          payload: {
            data,
            pageCount,
          },
        };
      } catch (_err) {
        return {
          success: false,
          message: 'Failed to fetch cron jobs',
          payload: {
            data: [],
            pageCount: 0,
          },
        };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 1,
      tags: ['cronjobs'],
    },
  )();
}
