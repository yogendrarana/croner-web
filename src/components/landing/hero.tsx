'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TextLoop } from '@/components/text-loop';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <Badge variant="outline" className="px-4 py-1 text-sm">
            <span className="mr-1 bg-green-500 h-2 w-2 rounded-full inline-block"></span>
            Now in public beta
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The easiest way to <br />
            <TextLoop className="text-4xl">
              <span>run your tasks</span>
              <span>backup your database</span>
              <span>generate reports</span>
              <span>send notifications</span>
              <span>process data</span>
            </TextLoop>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Croner is a modern cron job scheduler that makes it simple to run automated tasks with precision timing and reliable execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="group cursor-pointer">
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="cursor-pointer">
                View documentation
              </Button>
            </Link>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>99.9% uptime guarantee</span>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 md:mt-24">
          <div className="relative rounded-xl border bg-background shadow-lg overflow-hidden">
            {/* Top bar with decorative buttons */}
            <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/70"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500/70"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
              <div className="mx-auto text-sm text-muted-foreground">Dashboard Preview</div>
            </div>

            <div className="p-4">
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Croner Dashboard Preview"
                className="w-full h-auto rounded-md border shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
