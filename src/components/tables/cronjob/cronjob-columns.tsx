import { ColumnDef } from '@tanstack/react-table';

import JobStatus from '@/components/job-status';
import { TanStackTableCronJob } from '@/types/cronjob';
import { Checkbox } from '@/components/ui/checkbox';
import JobTableRowActions from './cronjob-table-row-actions';
import DataTableColumnHeader from '@/components/data-table/data-table-column-header';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const cronjobColumns: ColumnDef<TanStackTableCronJob>[] = [
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
    accessorKey: 'name',
    header: 'Name',
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
  },
  {
    accessorKey: 'schedule',
    header: 'Schedule',
    cell: ({ row }) => <code className="px-1 py-0.5 bg-muted text-sm rounded">{row.original.schedule}</code>,
  },
  {
    accessorKey: 'nextRun',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Next Run" />,
    cell: ({ row }) => formatDate(row.getValue('nextRun')),
  },
  {
    accessorKey: 'lastRun',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Run" />,
    cell: ({ row }) => formatDate(row.getValue('lastRun')),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableColumnFilter: true,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <JobStatus status={status} />;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => formatDate(row.getValue('created_at')),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <JobTableRowActions job={row.original} />;
    },
  },
];
