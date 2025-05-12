import { z } from 'zod';
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

import { CronJobSelect, CronJobTable } from '@/server/db/schema';
import { getSortingStateParser } from '@/lib/parsers';

export const searchParamsCache = createSearchParamsCache({
  name: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<CronJobSelect>().withDefault([{ id: 'createdAt', desc: true }]),
  status: parseAsArrayOf(z.enum(CronJobTable.status.enumValues)).withDefault([]),
  lastRunStatus: parseAsArrayOf(z.enum(CronJobTable.lastRunStatus.enumValues)).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
});

export type TGetCronJobsSearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
