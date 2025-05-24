import { Suspense } from 'react';

import { getDashboardData } from './_lib/queries';
import MetricsOverview from './_components/metrics-overview';
import RecentCronJobs from './_components/recent-cronjobs';
import DashboardStats from './_components/dashboard-stats';
import KpiCardSkeleton from './_components/kpi-card-skeleton';

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="flex-1 space-y-4">
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <DashboardStats data={data} />
      </Suspense>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div>
          <RecentCronJobs data={data} />
        </div>
        <div>
          <MetricsOverview />
        </div>
      </div>
    </div>
  );
}
