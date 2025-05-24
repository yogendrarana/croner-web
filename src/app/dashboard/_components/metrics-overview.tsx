import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Clock, Timer, CheckCircle2, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import KpiCard from './kpi-card';

export default function MetricsOverview() {
  return (
    <Card className="col-span-3">
      <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Last 30 days metrics</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <KpiCard 
            title="Total Executions" 
            value="1,234" 
            description="Last 30 days"
          >
            <Activity className="h-4 w-4 text-muted-foreground" />
          </KpiCard>

          <KpiCard 
            title="Success Rate" 
            value="99.8%" 
            description="Last 30 days"
          >
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </KpiCard>

          <KpiCard 
            title="Avg Response" 
            value="245ms" 
            description="Last 30 days"
          >
            <Timer className="h-4 w-4 text-muted-foreground" />
          </KpiCard>

          <KpiCard 
            title="Avg Duration" 
            value="1.2s" 
            description="Last 30 days"
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
          </KpiCard>
        </div>
        <div className="pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              View Detailed Metrics
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 