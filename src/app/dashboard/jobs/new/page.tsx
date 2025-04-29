"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    name: '',
    url: '',
    method: 'GET',
    schedule: '0 * * * *',
    retries: '3',
    timeout: '30',
    active: true,
    notifyOnSuccess: false,
    notifyOnFailure: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormValues(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Job Created",
      description: `${formValues.name} has been scheduled successfully.`,
    });
    
    router.push('/dashboard/jobs');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Create New Cron Job</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Configure the basic information for your cron job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Job Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Daily Database Backup"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL to Call</Label>
                  <Input
                    id="url"
                    name="url"
                    placeholder="https://api.example.com/backup"
                    value={formValues.url}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="method">HTTP Method</Label>
                  <Select
                    value={formValues.method}
                    onValueChange={(value) => handleSelectChange('method', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select HTTP method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formValues.active}
                      onCheckedChange={(checked) => handleSwitchChange('active', checked)}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable or disable this job. Disabled jobs won't run until reactivated.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to be notified about job executions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyOnSuccess">Notify on Success</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when job executes successfully
                  </p>
                </div>
                <Switch
                  id="notifyOnSuccess"
                  checked={formValues.notifyOnSuccess}
                  onCheckedChange={(checked) => handleSwitchChange('notifyOnSuccess', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyOnFailure">Notify on Failure</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when job execution fails
                  </p>
                </div>
                <Switch
                  id="notifyOnFailure"
                  checked={formValues.notifyOnFailure}
                  onCheckedChange={(checked) => handleSwitchChange('notifyOnFailure', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>
                Set when and how often this job should run
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cron">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cron">Cron Expression</TabsTrigger>
                  <TabsTrigger value="human">Human Readable</TabsTrigger>
                </TabsList>
                <TabsContent value="cron" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Cron Expression</Label>
                    <Input
                      id="schedule"
                      name="schedule"
                      placeholder="* * * * *"
                      value={formValues.schedule}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Format: Minute Hour Day Month Weekday
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Examples:</h4>
                    <ul className="space-y-1 text-sm">
                      <li><code className="text-xs">0 * * * *</code> - Every hour at minute 0</li>
                      <li><code className="text-xs">*/15 * * * *</code> - Every 15 minutes</li>
                      <li><code className="text-xs">0 0 * * *</code> - Once a day at midnight</li>
                      <li><code className="text-xs">0 9 * * 1-5</code> - Weekdays at 9:00 AM</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="human" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select defaultValue="hourly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutely">Every Minute</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Select defaultValue="0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">00:00</SelectItem>
                          <SelectItem value="1">01:00</SelectItem>
                          <SelectItem value="2">02:00</SelectItem>
                          <SelectItem value="3">03:00</SelectItem>
                          <SelectItem value="4">04:00</SelectItem>
                          <SelectItem value="5">05:00</SelectItem>
                          <SelectItem value="6">06:00</SelectItem>
                          <SelectItem value="12">12:00</SelectItem>
                          <SelectItem value="18">18:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    This will be converted to a cron expression: <code>0 * * * *</code>
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure additional parameters for your job
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    name="timeout"
                    type="number"
                    min="1"
                    max="300"
                    value={formValues.timeout}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retries">Retries</Label>
                  <Input
                    id="retries"
                    name="retries"
                    type="number"
                    min="0"
                    max="10"
                    value={formValues.retries}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headers">HTTP Headers (JSON)</Label>
                <Textarea
                  id="headers"
                  name="headers"
                  placeholder='{"Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json"}'
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Request Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder='{"key": "value"}'
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  For POST, PUT, and PATCH requests only
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button onClick={handleSubmit}>Create Job</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}