'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Download, Trash2 } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { exportTableToCSV } from '@/lib/csv';
import { CronJobSelect } from '@/server/db/schema';
import { Separator } from '@/components/ui/separator';
import { deleteCronJobs } from '@/app/dashboard/cronjobs/_lib/actions';
import { DataTableActionBar, DataTableActionBarAction, DataTableActionBarSelection } from '@/components/data-table/data-table-action-bar';

const actions = ['export', 'delete'] as const;

type Action = (typeof actions)[number];

interface CronJobTableActionBarProps {
  table: Table<CronJobSelect>;
}

export function CronJobTableActionBar({ table }: CronJobTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;
  const [isPending, startTransition] = React.useTransition();
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null);

  const getIsActionPending = React.useCallback((action: Action) => isPending && currentAction === action, [isPending, currentAction]);

  const onCronjobExport = React.useCallback(() => {
    setCurrentAction('export');
    startTransition(() => {
      exportTableToCSV(table, {
        filename: 'cronjobs',
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      });
    });
  }, [table]);

  const onCronJobsDelete = React.useCallback(() => {
    setCurrentAction('delete');
    startTransition(async () => {
      const { success, message } = await deleteCronJobs({
        ids: rows.map(row => row.original.id),
      });

      if (!success) {
        toast.error(message || 'Failed to delete cronjobs');
        return;
      }

      toast.success(message || 'Cronjobs deleted successfully');
      table.toggleAllRowsSelected(false);
    });
  }, [rows, table]);

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator orientation="vertical" className="hidden data-[orientation=vertical]:h-5 sm:block" />
      <div className="flex items-center gap-1.5">
        <DataTableActionBarAction size="icon" tooltip="Export cronjobs" isPending={getIsActionPending('export')} onClick={onCronjobExport}>
          <Download />
        </DataTableActionBarAction>
        <DataTableActionBarAction size="icon" tooltip="Delete cronjobs" isPending={getIsActionPending('delete')} onClick={onCronJobsDelete}>
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  );
}
