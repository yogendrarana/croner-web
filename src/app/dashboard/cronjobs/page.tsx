import { Suspense } from 'react';
import Link from 'next/link';

import { SearchParams } from '@/types/util';
import { Button } from '@/components/ui/button';
import { searchParamsCache } from './_lib/search-params-schema';
import { getCronJobs } from '@/app/dashboard/cronjobs/_lib/queries';
import DataTableSkeleton from '@/components/data-table/data-table-skeleton';
import CronJobTable from '@/app/dashboard/cronjobs/_components/table/cronjob-table';

interface PropType {
  searchParams: SearchParams;
}

export default async function CronJobsPage(props: PropType) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const promises = Promise.all([getCronJobs(search)]);

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Cron Jobs</h2>
        <Link href="/dashboard/cronjobs/new">
          <Button size="sm" className="rounded-sm">
            Create Cron Job
          </Button>
        </Link>
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={5} filterCount={2} cellWidths={['10rem', '30rem', '10rem', '10rem', '6rem']} shrinkZero />}>
        <CronJobTable promises={promises} />
      </Suspense>
    </div>
  );
}
