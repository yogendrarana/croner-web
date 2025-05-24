import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, Timer, CheckCircle2 } from 'lucide-react';
import { getMetricsData } from '../_lib/queries';

export default async function MetricsPage() {
  const data = await getMetricsData();

  if (!data.success || !data.payload) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Cron Job Metrics</h2>
        </div>
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Failed to load metrics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Cron Job Metrics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.payload.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.payload.avgDuration}s</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.payload.totalExecutions}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.payload.successRate}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>Average response time over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your response time chart here */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Response time chart will be displayed here</div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Execution Duration Distribution</CardTitle>
            <CardDescription>Distribution of job execution durations</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your duration distribution chart here */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Duration distribution chart will be displayed here</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Execution Patterns</CardTitle>
            <CardDescription>Hourly and daily execution patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your execution patterns chart here */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Execution patterns chart will be displayed here</div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Error Analysis</CardTitle>
            <CardDescription>Common error patterns and their frequency</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add your error analysis chart here */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Error analysis chart will be displayed here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
