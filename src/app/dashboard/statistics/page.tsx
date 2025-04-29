"use client"

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, AreaChart, PieChart } from 'recharts';
import { ChevronUp, ChevronDown, ArrowUpRight, DownloadIcon, RefreshCcw } from 'lucide-react';

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  
  const jobExecutions = [
    { date: "Apr 16", successful: 142, failed: 8 },
    { date: "Apr 17", successful: 156, failed: 12 },
    { date: "Apr 18", successful: 163, failed: 5 },
    { date: "Apr 19", successful: 145, failed: 7 },
    { date: "Apr 20", successful: 168, failed: 9 },
    { date: "Apr 21", successful: 172, failed: 3 },
    { date: "Apr 22", successful: 160, failed: 6 },
  ];
  
  const topJobs = [
    { name: "Database Backup", executions: 65 },
    { name: "Log Rotation", executions: 58 },
    { name: "Email Campaign", executions: 45 },
    { name: "Analytics Report", executions: 32 },
    { name: "System Check", executions: 28 },
  ];
  
  const jobCategories = [
    { name: "Database", value: 35 },
    { name: "Reporting", value: 25 },
    { name: "Maintenance", value: 20 },
    { name: "Notifications", value: 15 },
    { name: "Other", value: 5 },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Badge variant="outline" className="text-xs">Last 7 days</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,146</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">12%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Badge variant="outline" className="text-xs">Last 7 days</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.6%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">2.1%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Badge variant="outline" className="text-xs">Last 7 days</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ChevronDown className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">0.3s</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">3</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="execution">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="execution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Executions</CardTitle>
              <CardDescription>
                Successful vs failed job executions over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <AreaChart
                data={jobExecutions}
                index="date"
                categories={["successful", "failed"]}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-3))"]}
                valueFormatter={(value) => `${value}`}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Executed Jobs</CardTitle>
                <CardDescription>
                  Top jobs by execution count
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={topJobs}
                  index="name"
                  categories={["executions"]}
                  colors={["hsl(var(--chart-2))"]}
                  valueFormatter={(value) => `${value}`}
                  layout="vertical"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jobs by Category</CardTitle>
                <CardDescription>
                  Distribution of jobs across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                asdf
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>
                Average job response time (milliseconds) by day
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <LineChart
                data={[
                  { date: "Apr 16", api: 120, worker: 85 },
                  { date: "Apr 17", api: 132, worker: 75 },
                  { date: "Apr 18", api: 125, worker: 80 },
                  { date: "Apr 19", api: 130, worker: 87 },
                  { date: "Apr 20", api: 128, worker: 82 },
                  { date: "Apr 21", api: 118, worker: 76 },
                  { date: "Apr 22", api: 122, worker: 79 },
                ]}
                index="date"
                categories={["api", "worker"]}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-4))"]}
                valueFormatter={(value) => `${value}ms`}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Duration Distribution</CardTitle>
                <CardDescription>
                  Count of jobs by execution duration
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={[
                    { range: "0-200ms", count: 320 },
                    { range: "200-500ms", count: 580 },
                    { range: "500ms-1s", count: 420 },
                    { range: "1s-2s", count: 250 },
                    { range: "2s+", count: 180 },
                  ]}
                  index="range"
                  categories={["count"]}
                  colors={["hsl(var(--chart-2))"]}
                  valueFormatter={(value) => `${value}`}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>
                  CPU and memory usage over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={[
                    { date: "Apr 16", cpu: 45, memory: 30 },
                    { date: "Apr 17", cpu: 52, memory: 32 },
                    { date: "Apr 18", cpu: 49, memory: 35 },
                    { date: "Apr 19", cpu: 58, memory: 38 },
                    { date: "Apr 20", cpu: 55, memory: 40 },
                    { date: "Apr 21", cpu: 60, memory: 45 },
                    { date: "Apr 22", cpu: 53, memory: 43 },
                  ]}
                  index="date"
                  categories={["cpu", "memory"]}
                  colors={["hsl(var(--chart-3))", "hsl(var(--chart-5))"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Jobs by Time of Day</CardTitle>
                <CardDescription>
                  Distribution of job executions by hour
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <BarChart
                  data={[
                    { hour: "00:00", count: 42 },
                    { hour: "01:00", count: 36 },
                    { hour: "02:00", count: 28 },
                    { hour: "03:00", count: 24 },
                    { hour: "04:00", count: 22 },
                    { hour: "05:00", count: 26 },
                    { hour: "06:00", count: 38 },
                    { hour: "07:00", count: 54 },
                    { hour: "08:00", count: 70 },
                    { hour: "09:00", count: 85 },
                    { hour: "10:00", count: 78 },
                    { hour: "11:00", count: 74 },
                    { hour: "12:00", count: 82 },
                    { hour: "13:00", count: 76 },
                    { hour: "14:00", count: 70 },
                    { hour: "15:00", count: 67 },
                    { hour: "16:00", count: 58 },
                    { hour: "17:00", count: 52 },
                    { hour: "18:00", count: 48 },
                    { hour: "19:00", count: 46 },
                    { hour: "20:00", count: 54 },
                    { hour: "21:00", count: 60 },
                    { hour: "22:00", count: 58 },
                    { hour: "23:00", count: 48 },
                  ]}
                  index="hour"
                  categories={["count"]}
                  colors={["hsl(var(--chart-2))"]}
                  valueFormatter={(value) => `${value}`}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jobs by Day of Week</CardTitle>
                <CardDescription>
                  Distribution of job executions by weekday
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <BarChart
                  data={[
                    { day: "Monday", count: 186 },
                    { day: "Tuesday", count: 204 },
                    { day: "Wednesday", count: 198 },
                    { day: "Thursday", count: 192 },
                    { day: "Friday", count: 180 },
                    { day: "Saturday", count: 120 },
                    { day: "Sunday", count: 110 },
                  ]}
                  index="day"
                  categories={["count"]}
                  colors={["hsl(var(--chart-1))"]}
                  valueFormatter={(value) => `${value}`}
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>HTTP Status Code Distribution</CardTitle>
              <CardDescription>
                Count of responses by HTTP status code
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              asfd
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}