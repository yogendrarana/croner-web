'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Download, Clock, CheckCircle2, ArrowUpRight, AlertCircle } from 'lucide-react';

export default function BillingPage() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateCard = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download all invoices
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15/month</div>
            <p className="text-xs text-muted-foreground">Next billing date: May 1, 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Credits</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42/50</div>
            <p className="text-xs text-muted-foreground">Jobs used this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 GB</div>
            <p className="text-xs text-muted-foreground">Of 5 GB included</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment method and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
              <Button variant="outline" onClick={handleUpdateCard} disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Billing Email</Label>
              <Input defaultValue="john.doe@example.com" />
            </div>

            <div className="space-y-2">
              <Label>Billing Address</Label>
              <Input defaultValue="123 Main St" className="mb-2" />
              <Input defaultValue="Suite 100" className="mb-2" />
              <div className="grid grid-cols-3 gap-2">
                <Input defaultValue="San Francisco" />
                <Input defaultValue="CA" />
                <Input defaultValue="94105" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>Monitor your resource usage and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  Job Executions
                  <AlertCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <span>42/50 jobs</span>
              </div>
              <Progress value={84} />
              <p className="text-xs text-muted-foreground">8 executions remaining this month</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  Storage
                  <AlertCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <span>2.1/5 GB</span>
              </div>
              <Progress value={42} />
              <p className="text-xs text-muted-foreground">2.9 GB available</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  API Calls
                  <AlertCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
                <span>8.2k/10k</span>
              </div>
              <Progress value={82} />
              <p className="text-xs text-muted-foreground">1.8k calls remaining this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: 'Apr 1, 2025',
                amount: '$15.00',
                status: 'Paid',
                invoice: 'INV-2025-004',
              },
              {
                date: 'Mar 1, 2025',
                amount: '$15.00',
                status: 'Paid',
                invoice: 'INV-2025-003',
              },
              {
                date: 'Feb 1, 2025',
                amount: '$15.00',
                status: 'Paid',
                invoice: 'INV-2025-002',
              },
              {
                date: 'Jan 1, 2025',
                amount: '$15.00',
                status: 'Paid',
                invoice: 'INV-2025-001',
              },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">{invoice.invoice}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-300">
                    {invoice.status}
                  </Badge>
                  <span className="font-medium">{invoice.amount}</span>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
