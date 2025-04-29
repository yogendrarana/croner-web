import React from "react";
import { TJob } from "@/types/job";
import { jobColumns } from "./job-columns";
import DataTable from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { JobTableToolbar } from "./job-table-toolbar";
import { DataTableFilterField } from "@/types/data-table";
import { JobStatusEnum } from "@/types/enums/job";
import { useDataTable } from "@/hooks/use-data-table";

interface PropType {
  data: TJob[];
}

export default function JobTable({ data }: PropType) {
  const filterFields: DataTableFilterField<TJob>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.values(JobStatusEnum)?.map((status: string) => ({
        label: status?.toUpperCase() || "",
        value: status,
        withCount: true,
      })),
    },
  ];

  const { table } = useDataTable({
    data,
    columns: jobColumns,
    pageCount: Math.ceil(data.length / 10),
    filterFields,
    initialState: {
      sorting: [{ id: "created", desc: true }],
      columnPinning: { right: ["actions"] },
      pagination: { pageSize: 10, pageIndex: 0 },
      columnVisibility: {
        created: false,
      },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <div className="space-y-1 rounded-md border p-2 bg-muted">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DataTable table={table} className="w-full" />
      <DataTablePagination table={table} className="px-1" />
    </div>
  );
}
