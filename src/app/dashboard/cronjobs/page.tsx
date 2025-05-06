import Link from 'next/link';
import { jobs } from '@/config/data/jobs';
import { Button } from '@/components/ui/button';
import JobTable from '@/components/tables/job/job-table';

export default function JobsPage() {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Cron Jobs</h2>
        <Link href='/dashboard/cronjobs/new'>
          <Button size="sm" className="rounded-sm">
            Create Cron Job
          </Button>
        </Link>
      </div>

      <JobTable data={jobs} />
    </div>
  );
}
