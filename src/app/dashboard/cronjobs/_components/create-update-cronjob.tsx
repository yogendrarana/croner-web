'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Calendar, AlertCircle, RefreshCw, Globe, Lock, Code, Send, Check } from 'lucide-react';

import { cronjobDays } from '@/config/data';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { FormMode, FormModeType } from '@/const/form';
import { updateCronExpression } from '@/lib/helpers/cron';
import { createCronjob, updateCronJobs } from '../_lib/actions';
import { CreateCronJobSchema, TCreateCronJobSchema } from '../_lib/validations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const TIMEZONES = Intl.supportedValuesOf('timeZone');

interface PropTypes {
  formMode: FormModeType;
}

export default function CreateUpdateCronjob({ formMode }: PropTypes) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  const form = useForm<TCreateCronJobSchema>({
    resolver: zodResolver(CreateCronJobSchema),
    defaultValues: {
      name: '',
      url: 'http://',
      description: '',
      httpMethod: 'POST',
      httpHeaders: {},
      httpBody: {},
      httpAuthUsername: '',
      httpAuthPassword: '',
      schedule: '0 * * * *',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      active: true,
      maxRetries: 3,
      timeoutSeconds: 30,
      notifyOnFailure: true,
      notifyOnSuccessAfterFailure: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: TCreateCronJobSchema) => {
    try {
      setIsSubmitting(true);

      let result;
      if (formMode === FormMode.CREATE) {
        result = await createCronjob(data);
      } else if (formMode === FormMode.UPDATE) {
        result = await updateCronJobs(1, data);
      }

      if (result?.success) {
        toast.success('Job Created', {
          description: `${data.name} has been scheduled successfully.`,
        });
        router.push('/dashboard/cronjobs');
      } else {
        toast.error('Error', {
          description: result?.message || 'Failed to create job.',
        });
      }
    } catch (error: any) {
      toast.error('Error', {
        description: error?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update cron expression based on human-readable selections
  const [frequency, setFrequency] = useState('hourly');
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);

  useEffect(() => {
    const cronExpression = form.watch('schedule');

    const now = new Date();
    const simulateNextRuns = () => {
      const runs: string[] = [];
      let nextDate = new Date(now);

      for (let i = 0; i < 3; i++) {
        // This is just a simple simulation based on common patterns
        if (cronExpression === '* * * * *') {
          // Minutely
          nextDate = new Date(nextDate.getTime() + (i === 0 ? 60000 : 60000));
        } else if (cronExpression.startsWith('0 * * * *')) {
          // Hourly
          nextDate = new Date(nextDate.getTime() + (i === 0 ? 0 : 60 * 60 * 1000));
          nextDate.setMinutes(0, 0, 0);
          if (nextDate <= now) {
            nextDate = new Date(nextDate.getTime() + 60 * 60 * 1000);
          }
        } else if (cronExpression.match(/\d+ \d+ \* \* \*/)) {
          // Daily
          nextDate = new Date(nextDate.getTime() + i * 24 * 60 * 60 * 1000);
          const [min, hour] = cronExpression.split(' ').map(Number);
          nextDate.setHours(hour, min, 0, 0);
          if (nextDate <= now && i === 0) {
            nextDate = new Date(nextDate.getTime() + 24 * 60 * 60 * 1000);
          }
        } else {
          // For other patterns, just add a day for simulation
          nextDate = new Date(nextDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
        }

        runs.push(
          nextDate.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: form.watch('timezone') || 'UTC',
          }),
        );
      }

      return runs;
    };

    setNextRuns(simulateNextRuns());
  }, [form.watch('schedule'), form.watch('timezone')]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </Button>
        <h2 className="text-lg font-bold tracking-tight">Create Cron Job</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Details Card */}
          <Card>
            <CardHeader className="bg-muted/50">
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                <CardTitle>Job Details</CardTitle>
              </div>
              <CardDescription>Configure the basic information for your cron job</CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Job Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Daily Database Backup" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>URL to Call *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="https://api.example.com/backup" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="httpMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HTTP Method *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select HTTP method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description of what this job does" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>Enable or disable this job</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card>
            <CardHeader className="bg-muted/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Schedule</CardTitle>
              </div>
              <CardDescription>Set when and how often this job should run</CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Timezone</FormLabel>
                      <span className="hidden text-sm text-muted-foreground md:block">All schedules are relative to the selected timezone</span>
                    </div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="" disabled>
                            Select timezone
                          </option>
                          {TIMEZONES.map(tz => (
                            <option key={tz} value={tz}>
                              {tz}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">cron expression</span>
                </div>
              </div>

              {/* Simple Schedule Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select
                    value={frequency}
                    onValueChange={value => {
                      setFrequency(value);
                      const expression = updateCronExpression(value, { selectedDayOfWeek: dayOfWeek, selectedDayOfMonth: dayOfMonth });
                      form.setValue('schedule', expression);
                    }}
                  >
                    <SelectTrigger className="w-full">
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
              </div>

              {frequency === 'weekly' && (
                <div className="space-y-2 pt-2">
                  <Label>Day of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {cronjobDays.map(item => (
                      <Badge
                        key={item.value}
                        variant={dayOfWeek === item.value ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          setDayOfWeek(item.value);
                          const expression = updateCronExpression(frequency, { selectedDayOfWeek: item.value, selectedDayOfMonth: dayOfMonth });
                          form.setValue('schedule', expression);
                        }}
                      >
                        {item.day.substring(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {frequency === 'monthly' && (
                <div className="space-y-2 pt-2">
                  <Label>Day of Month</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(dayNum => (
                      <Badge
                        key={dayNum}
                        variant={dayOfMonth === dayNum ? 'default' : 'outline'}
                        className="cursor-pointer py-1"
                        onClick={() => {
                          setDayOfMonth(dayNum);
                          const expression = updateCronExpression(frequency, { selectedDayOfWeek: dayOfWeek, selectedDayOfMonth: dayNum });
                          form.setValue('schedule', expression);
                        }}
                      >
                        {dayNum}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Cron Expression Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-5 gap-2">
                        {['Minute', 'Hour', 'Day', 'Month', 'Weekday'].map((label, index) => {
                          const cronParts = field.value.split(' ');
                          const currentValue = cronParts[index];

                          return (
                            <div key={label} className="space-y-1">
                              <Label className="text-xs">{label}</Label>
                              <Input
                                value={currentValue}
                                onChange={e => {
                                  const newParts = [...cronParts];
                                  newParts[index] = e.target.value;
                                  field.onChange(newParts.join(' '));
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Preview Next Executions
                </Label>
                <div className="space-y-2 bg-muted/30 p-3 rounded-md">
                  {nextRuns.length > 0 ? (
                    nextRuns.map((run, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{index === 0 ? 'Next:' : `Run ${index + 1}:`}</span>
                        <span>{run}</span>
                        {index === 0 && (
                          <Badge variant="outline" className="ml-auto">
                            Next run
                          </Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Select a timezone to see preview</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings Card */}
          <Card>
            <CardHeader className="bg-muted/50">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>Configure how you want to be notified about job executions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="notifyOnFailure"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <FormLabel>Notify on Failure</FormLabel>
                        </div>
                        <FormDescription>Receive notifications when job execution fails</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notifyOnSuccessAfterFailure"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <FormLabel>Notify on Recovery</FormLabel>
                        </div>
                        <FormDescription>Receive notifications when job succeeds after previously failing</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings Card */}
          <Card>
            <CardHeader className="bg-muted/50">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Advanced Settings</CardTitle>
              </div>
              <CardDescription>Configure additional parameters for your job</CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Timeout and Retries</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="timeoutSeconds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Timeout
                          <FormDescription>(Maximum time a job can run before timing out in milliseconds)</FormDescription>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxRetries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Max Retries
                          <FormDescription>(Number of times to retry if the job fails)</FormDescription>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">HTTPS Options</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="httpAuthUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auth Username (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="httpAuthPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auth Password (Optional)</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="httpHeaders"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>HTTP Headers (JSON)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='{"Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json"}'
                            rows={3}
                            value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                            onChange={e => {
                              try {
                                field.onChange(JSON.parse(e.target.value));
                              } catch {
                                field.onChange({});
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="httpBody"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Request Body (JSON)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='{"key": "value"}'
                            rows={3}
                            value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                            onChange={e => {
                              try {
                                field.onChange(JSON.parse(e.target.value));
                              } catch {
                                field.onChange({});
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>For POST, PUT, and PATCH requests only</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-1">
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {formMode === FormMode.UPDATE ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{formMode === FormMode.UPDATE ? 'Update Job' : 'Create Job'}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
