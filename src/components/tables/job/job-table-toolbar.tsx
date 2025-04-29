"use client";

import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { exportTableToCSV } from "@/lib/csv";
import { DownloadIcon } from "@radix-ui/react-icons";
import { TJob } from "@/types/job";
import BulkDeleteDialog from "@/components/bulk-delete-dialog";

interface OrderTableToolbarProps {
  table: Table<TJob>;
}

export function JobTableToolbar({ table }: OrderTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <BulkDeleteDialog
          onSuccess={() => table.toggleAllRowsSelected(false)}
          resource="job"
          resourceIds={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original.id)}
        />
      ) : null} */}

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "jobs",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}
