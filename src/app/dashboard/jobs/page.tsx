"use client";

import { jobs } from "@/config/data/jobs";
import JobTable from "@/components/tables/job/job-table";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Cron Jobs</h2>
        <Button size="sm" className="rounded-sm">
          Create Cron Job
        </Button>
      </div>

      <JobTable data={jobs} />
    </div>
  );
}
