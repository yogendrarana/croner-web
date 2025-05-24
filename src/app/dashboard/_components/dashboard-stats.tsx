import React from 'react';
import { Activity, Clock, XCircle, PlayCircle } from 'lucide-react';

import KpiCard from './kpi-card';
import { getDashboardData } from '../_lib/queries';

interface PropType {
  data: Awaited<ReturnType<typeof getDashboardData>>;
}

export default async function DashboardStats({ data }: PropType) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Total CronJobs" value={data?.payload?.totalCronJobs ?? 0} description="+5 from last month">
        <Clock className="h-4 w-4 text-muted-foreground" />
      </KpiCard>

      <KpiCard title="Failed Jobs" value={data.payload?.totalFailedJobs ?? 0} description="-2 from last week">
        <XCircle className="h-4 w-4 text-muted-foreground" />
      </KpiCard>

      <KpiCard title="Active Now" value={data.payload?.totalActiveJobs ?? 0} description="1 job currently running">
        <Activity className="h-4 w-4 text-muted-foreground" />
      </KpiCard>

      <KpiCard title="Total Executions" value="1,234" description="Last 30 days">
        <PlayCircle className="h-4 w-4 text-muted-foreground" />
      </KpiCard>
    </div>
  );
}
