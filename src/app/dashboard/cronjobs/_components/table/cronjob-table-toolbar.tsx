'use client';

import { exportTableToCSV } from '@/lib/csv';
import { Button } from '@/components/ui/button';
import { type Table } from '@tanstack/react-table';
import { DownloadIcon } from '@radix-ui/react-icons';
import { CronJobSelect } from '@/server/db/schema';

interface OrderTableToolbarProps {
  table: Table<CronJobSelect>;
}

export default function CronjobTableToolbar({ table }: OrderTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'jobs',
            excludeColumns: ['select', 'actions'],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}
