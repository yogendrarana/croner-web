"use client"

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Server,
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart
} from 'lucide-react';
import { AreaChart, LineChart } from 'recharts';

// Mock data
const services = [
  { name: "API Server", status: "operational", uptime: "99.99%", latency: "45ms" },
  { name: "Web UI", status: "operational", uptime: "99.98%", latency: "120ms" },
  { name: "Scheduler", status: "operational", uptime: "99.95%", latency: "30ms" },
  { name: "Worker Pool", status: "operational", uptime: "99.97%", latency: "25ms" },
  { name: "Database", status: "operational", uptime: "99.99%", latency: "15ms" },
  { name: "Notification Service", status: "degraded", uptime: "99.85%", latency: "250ms" },
  { name: "Storage", status: "operational", uptime: "99.99%", latency: "40ms" },
  { name: "Authentication", status: "operational", uptime: "99.99%", latency: "65ms" },
];

const incidents = [
  { 
    id: 1, 
    title: "Scheduler Performance Degradation", 
    status: "resolved", 
    start: "2025-04-15T14:30:00", 
    end: "2025-04-15T16:45:00",
    description: "The scheduler experienced performance degradation due to high load. Our team implemented a fix by scaling up the service and optimizing the job queue." 
  },
  { 
    id: 2, 
    title: "Notification Service Delays", 
    status: "investigating", 
    start: "2025-04-22T10:15:00", 
    end: null,
    description: "We are currently experiencing delays in the notification delivery system. Our engineers are investigating the issue." 
  }
];

const uptimeData = [
  { date: "2025-04-16", value: 100 },
  { date: "2025-04-17", value: 100 },
  { date: "2025-04-18", value: 99.9 },
  { date: "2025-04-19", value: 100 },
  { date: "2025-04-20", value: 100 },
  { date: "2025-04-21", value: 99.8 },
  { date: "2025-04-22", value: 99.7 },
];

export default function StatusPage() {
  const [progress, setProgress] = useState(13);
  const [systemHealth, setSystemHealth] = useState(99.7);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress >= 100 ? 13 : prevProgress + 1);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Status</h2>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              systemHealth > 99.9 ? "bg-green-500/10 text-green-700 border-green-300" :
              systemHealth > 99.5 ? "bg-yellow-500/10 text-yellow-700 border-yellow-300" :
              "bg-red-500/10 text-red-700 border-red-300"
            }
          >
            {systemHealth > 99.9 ? (
              <>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                All Systems Operational
              </>
            ) : systemHealth > 99.5 ? (
              <>
                <AlertTriangle className="mr-1 h-4 w-4" />
                Partial System Degradation
              </>
            ) : (
              <>
                <XCircle className="mr-1 h-4 w-4" />
                System Outage
              </>
            )}
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Uptime</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76ms</div>
            <p className="text-xs text-muted-foreground">
              +3ms from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              1 incident being investigated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>CPU</div>
                <div className="text-muted-foreground">{progress}%</div>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Uptime History (Last 7 Days)</CardTitle>
          <CardDescription>Historical system uptime performance</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <LineChart
            data={uptimeData}
            index="date"
            categories={["value"]}
            colors={["hsl(var(--primary))"]}
            valueFormatter={(value) => `${value}%`}
            yAxisWidth={40}
          />
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Current status of all system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {service.status === "operational" ? (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    ) : service.status === "degraded" ? (
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    )}
                    <p className="font-medium">{service.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground hidden sm:block">
                      <span className="font-medium">Uptime:</span> {service.uptime}
                    </div>
                    <div className="text-sm text-muted-foreground hidden md:block">
                      <span className="font-medium">Latency:</span> {service.latency}
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        service.status === "operational" ? "bg-green-500/10 text-green-700 border-green-300" :
                        service.status === "degraded" ? "bg-yellow-500/10 text-yellow-700 border-yellow-300" :
                        "bg-red-500/10 text-red-700 border-red-300"
                      }
                    >
                      {service.status === "operational" ? "Operational" : 
                       service.status === "degraded" ? "Degraded" : "Outage"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Incidents</CardTitle>
            <CardDescription>Recent system incidents and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {incidents.map((incident) => (
                <div key={incident.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{incident.title}</h3>
                    <Badge
                      variant={incident.status === "resolved" ? "outline" : "secondary"}
                      className={
                        incident.status === "resolved" ? "bg-green-500/10 text-green-700 border-green-300" :
                        "bg-yellow-500/10 text-yellow-700 border-yellow-300"
                      }
                    >
                      {incident.status === "resolved" ? "Resolved" : "Investigating"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(incident.start)}
                    {incident.end ? ` - ${formatDate(incident.end)}` : " - Ongoing"}
                  </p>
                  <p className="text-sm">{incident.description}</p>
                </div>
              ))}
              
              {incidents.length === 0 && (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">No recent incidents</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>System response time and throughput</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <AreaChart
            data={[
              { date: "2025-04-16", responseTime: 72, throughput: 1250 },
              { date: "2025-04-17", responseTime: 75, throughput: 1320 },
              { date: "2025-04-18", responseTime: 69, throughput: 1400 },
              { date: "2025-04-19", responseTime: 73, throughput: 1380 },
              { date: "2025-04-20", responseTime: 80, throughput: 1290 },
              { date: "2025-04-21", responseTime: 78, throughput: 1350 },
              { date: "2025-04-22", responseTime: 76, throughput: 1410 },
            ]}
            index="date"
            categories={["responseTime", "throughput"]}
            colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
            valueFormatter={(value) => `${value}`}
            yAxisWidth={40}
          />
        </CardContent>
      </Card>
    </div>
  );
}