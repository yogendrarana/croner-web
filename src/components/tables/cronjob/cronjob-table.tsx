'use client';

import React from 'react';
import { cronjobColumns } from './cronjob-columns';
import { useDataTable } from '@/hooks/use-data-table';
import { TanStackTableCronJob } from '@/types/cronjob';
import { JobStatusEnum } from '@/types/enums/job-enums';
import { DataTableFilterField } from '@/types/data-table';
import DataTable from '@/components/data-table/data-table';
import DataTableToolbar from '@/components/data-table/data-table-toolbar';
import DataTablePagination from '@/components/data-table/data-table-pagination';

interface PropType {
  data: TanStackTableCronJob[];
}

export default function CronjobTable({ data }: PropType) {
  const filterFields: DataTableFilterField<TanStackTableCronJob>[] = [
    {
      label: 'Name',
      value: 'name',
      placeholder: 'Search by name...',
    },
    {
      label: 'Status',
      value: 'status',
      options: Object.values(JobStatusEnum)?.map((status: string) => ({
        label: status?.toUpperCase() || '',
        value: status,
        withCount: true,
      })),
    },
  ];

  const { table } = useDataTable({
    data,
    columns: cronjobColumns,
    pageCount: Math.ceil(data.length / 10),
    filterFields,
    initialState: {
      sorting: [{ id: 'created_at', desc: true }],
      columnPinning: { right: ['actions'] },
      pagination: { pageSize: 10, pageIndex: 0 },
      columnVisibility: {
        created_at: false,
      },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <div className="space-y-1 rounded-md border p-2 bg-muted">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DataTable table={table} className="bg-background" />
      <DataTablePagination table={table} className="px-1" />
    </div>
  );
}
