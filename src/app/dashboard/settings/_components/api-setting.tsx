'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ApiSetting() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for programmatic access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Production Key</h4>
                <p className="text-sm text-muted-foreground">Last used 2 days ago</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Development Key</h4>
                <p className="text-sm text-muted-foreground">Last used 5 hours ago</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Testing Key</h4>
                <p className="text-sm text-muted-foreground">Expired 30 days ago</p>
              </div>
              <Badge variant="outline" className="text-destructive border-destructive">
                Expired
              </Badge>
            </div>
          </div>

          <Button className="w-full">Generate new API key</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Configure webhook endpoints for real-time notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://api.example.com/webhook" />
          </div>

          <div className="space-y-2">
            <Label>Events to send</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="job-completed" defaultChecked />
                <Label htmlFor="job-completed">Job completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="job-failed" defaultChecked />
                <Label htmlFor="job-failed">Job failed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="job-started" />
                <Label htmlFor="job-started">Job started</Label>
              </div>
            </div>
          </div>

          <Button>Save webhook configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
