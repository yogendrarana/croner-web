import { ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/lib/date';
import { Checkbox } from '@/components/ui/checkbox';
import JobStatusBadge from '@/components/job-status';
import JobTableRowActions from './cronjob-table-row-actions';
import { CronJobSelect, CronJobTable } from '@/server/db/schema';
import DataTableColumnHeader from '@/components/data-table/data-table-column-header';

export default function getCronJobsTableColumns(): ColumnDef<CronJobSelect>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      enableColumnFilter: true,
      cell: ({ row }) => {
        const job = row.original;
        return (
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="flex gap-2 items-center">
                {job.active ? <div className="h-2 w-2 rounded-full bg-green-500" /> : <div className="h-2 w-2 rounded-full bg-gray-300" />}
                {job.name}
              </span>
              <span className="pl-4 text-xs text-muted-foreground hidden sm:inline-block">{job.url}</span>
            </div>
          </div>
        );
      },
      meta: {
        label: 'Name',
        placeholder: 'Search by name',
        variant: 'text',
        icon: () => <span className="text-muted-foreground">🔍</span>,
      },
    },
    {
      id: 'schedule',
      header: 'Schedule',
      accessorKey: 'schedule',
      cell: ({ row }) => <code className="px-1 py-0.5 bg-muted text-sm rounded">{row.original.schedule}</code>,
    },
    {
      id: 'lastRun',
      accessorKey: 'lastRun',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Run" />,
      cell: ({ row }) => formatDate(row.getValue('lastRun')),
    },
    {
      id: 'nextRun',
      accessorKey: 'nextRun',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Next Run" />,
      cell: ({ row }) => formatDate(row.getValue('nextRun')),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      enableColumnFilter: true,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <JobStatusBadge status={status} />;
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: CronJobTable.status.enumValues.map(status => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          icon: () => <JobStatusBadge status={status} />,
        })),
      },
    },
    {
      id: 'lastRunStatus',
      header: 'Run Status',
      accessorKey: 'lastRunStatus',
      enableColumnFilter: true,
      cell: ({ row }) => {
        const status = row.getValue('lastRunStatus') as string;
        return <JobStatusBadge status={status} />;
      },
      meta: {
        label: 'Run Status',
        variant: "select",
        options: CronJobTable.lastRunStatus.enumValues.map(status => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          icon: () => <JobStatusBadge status={status} />,
        })),
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => formatDate(row.getValue('createdAt')),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <JobTableRowActions job={row.original} />;
      },
    },
  ];
}
