'use client';

import React, { use, useMemo } from 'react';

import { useDataTable } from '@/hooks/use-data-table';
import DataTable from '@/components/data-table/data-table';
import getCronJobCTableTableColumns from './cronjob-columns';
import { CronJobTableActionBar } from './cronjob-table-action-bar';
import DataTableToolbar from '@/components/data-table/data-table-toolbar';
import DataTablePagination from '@/components/data-table/data-table-pagination';
import { getCronJobs } from '../../_lib/queries';

interface PropType {
  promises: Promise<[Awaited<ReturnType<typeof getCronJobs>>]>;
}

export default function CronJobTable({ promises }: PropType) {
  const [{ payload }] = use(promises);

  const columns = useMemo(() => getCronJobCTableTableColumns(), []);

  const { table } = useDataTable({
    data: payload.data || [],
    columns,
    pageCount: payload.pageCount,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
      pagination: { pageSize: 10, pageIndex: 0 },
      columnVisibility: {
        createdAt: false,
      },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <div className="space-y-1 rounded-md border p-2 bg-muted">
      <DataTableToolbar table={table} />
      <DataTable table={table} className="bg-background" actionBar={<CronJobTableActionBar table={table} />} />
      <DataTablePagination table={table} className="px-1" />
    </div>
  );
}
