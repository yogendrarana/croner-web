import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle2, Clock, XCircle, Cpu, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

// Mock data
const recentJobs = [
  {
    id: 1,
    name: 'Database Backup',
    schedule: '0 0 * * *',
    lastRun: '2025-04-22T02:00:00',
    status: 'success',
    duration: '42s',
  },
  {
    id: 2,
    name: 'Log Rotation',
    schedule: '0 12 * * *',
    lastRun: '2025-04-22T12:00:00',
    status: 'success',
    duration: '18s',
  },
  {
    id: 3,
    name: 'Email Campaign',
    schedule: '0 9 * * 1',
    lastRun: '2025-04-22T09:00:00',
    status: 'failed',
    duration: '1m 4s',
  },
  {
    id: 4,
    name: 'Analytics Report',
    schedule: '0 7 * * 5',
    lastRun: '2025-04-19T07:00:00',
    status: 'success',
    duration: '2m 12s',
  },
  {
    id: 5,
    name: 'System Check',
    schedule: '*/30 * * * *',
    lastRun: '2025-04-22T15:30:00',
    status: 'running',
    duration: '8s',
  },
];

const systemStatus = {
  uptime: '99.98%',
  responseTime: '89ms',
  serviceStatus: 'Operational',
  plannedMaintenance: null,
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Jobs</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">1 job currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Jobs and System Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Your last 5 scheduled jobs and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map(job => (
                <div key={job.id} className="flex items-center">
                  <div className="mr-4">
                    {job.status === 'success' && (
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                    {job.status === 'failed' && (
                      <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-700">
                        <XCircle className="h-5 w-5" />
                      </div>
                    )}
                    {job.status === 'running' && (
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
                          variant={job.status === 'success' ? 'outline' : job.status === 'failed' ? 'destructive' : 'secondary'}
                          className={job.status === 'running' ? 'animate-pulse' : ''}
                        >
                          {job.status === 'running' ? 'Running' : job.status === 'success' ? 'Successful' : 'Failed'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <p>Schedule: {job.schedule}</p>
                      <p>Duration: {job.duration}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <Link href="/dashboard/jobs">
                  <Button variant="outline" className="w-full">
                    View all jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of the Croner platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* System Status Indicators */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium">System Status</p>
                </div>
                <p className="text-sm">{systemStatus.serviceStatus}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Uptime</p>
                </div>
                <p className="text-sm">{systemStatus.uptime}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Response Time</p>
                </div>
                <p className="text-sm">{systemStatus.responseTime}</p>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Resource Usage</div>
                <div className="text-muted-foreground">{13}%</div>
              </div>
              <Progress value={13} />
              <p className="text-xs text-muted-foreground pt-1">Current resource utilization of your plan</p>
            </div>

            <div>
              <Link href="/dashboard/status">
                <Button variant="outline" className="w-full">
                  View detailed status
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
