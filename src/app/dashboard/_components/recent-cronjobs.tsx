import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getDashboardData } from '../_lib/queries';

interface PropTypes {
  data: Awaited<ReturnType<typeof getDashboardData>>;
}

export default function RecentCronJobs({ data }: PropTypes) {
  return (
    <Card className="col-span-4 flex flex-col h-full">
      <CardHeader>
        <CardTitle>Recent Jobs</CardTitle>
        <CardDescription>Your last 5 scheduled jobs and their status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-full flex-1 space-y-4">
          {data.payload?.recentCronJobs && data.payload.recentCronJobs.length > 0 ? (
            <div className="h-full flex flex-col justify-between">
              <div className='space-y-4 overflow-y-auto'>
                {data.payload.recentCronJobs.map(job => (
                  <div key={job.id} className="flex items-center">
                    <div className="mr-4">
                      {job.lastRunStatus === 'success' && (
                        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-700">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                      {job.lastRunStatus === 'failed' && (
                        <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-700">
                          <XCircle className="h-5 w-5" />
                        </div>
                      )}
                      {job.status === 'enabled' && (
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-700">
                          <Activity className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{job.name}</p>
                        <div>
                          <Badge
                            variant={job.lastRunStatus === 'success' ? 'outline' : job.lastRunStatus === 'failed' ? 'destructive' : 'secondary'}
                            className={job.status === 'enabled' ? 'animate-pulse' : ''}
                          >
                            {job.status === 'enabled' ? 'Running' : job.lastRunStatus === 'success' ? 'Successful' : 'Failed'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <p>Schedule: {job.schedule}</p>
                        <p>Last Run: {job.lastRun ? new Date(job.lastRun).toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/dashboard/cronjobs">
                  <Button variant="outline" className="w-full">
                    View all jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full flex-1 flex flex-col items-center justify-center py-8 text-center">
              <Link href="/dashboard/cronjobs/new">
                <p className="text-muted-foreground mb-4">No cron jobs found.</p>
                <Button>
                  Create New Job
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
