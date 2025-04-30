'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function NotificationSetting() {
  const [emailNotifications, setEmailNotifications] = useState({
    jobSuccess: true,
    jobFailure: true,
    systemUpdates: false,
    newsletter: false,
  });
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose when you would like to receive email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Job Success</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when jobs complete successfully</p>
            </div>
            <Switch
              checked={emailNotifications.jobSuccess}
              onCheckedChange={checked => setEmailNotifications(prev => ({ ...prev, jobSuccess: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Job Failure</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when jobs fail</p>
            </div>
            <Switch
              checked={emailNotifications.jobFailure}
              onCheckedChange={checked => setEmailNotifications(prev => ({ ...prev, jobFailure: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Updates</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about system updates and maintenance</p>
            </div>
            <Switch
              checked={emailNotifications.systemUpdates}
              onCheckedChange={checked => setEmailNotifications(prev => ({ ...prev, systemUpdates: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Newsletter</Label>
              <p className="text-sm text-muted-foreground">Receive our monthly newsletter with updates and tips</p>
            </div>
            <Switch
              checked={emailNotifications.newsletter}
              onCheckedChange={checked => setEmailNotifications(prev => ({ ...prev, newsletter: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
