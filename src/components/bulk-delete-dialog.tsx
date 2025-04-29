"use client";

import * as React from "react";
import { toast } from "sonner";
import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon, Trash } from "lucide-react";

interface DeleteOrderDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  resource: string;
  resourceIds: string[] | number[];
  showTrigger?: boolean;
  showTriggerText?: boolean;
  onSuccess?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export default function BulkDeleteDialog({
  resource,
  resourceIds,
  showTrigger = true,
  onSuccess,
  open,
  onOpenChange,
}: DeleteOrderDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  function onDelete() {
    startDeleteTransition(async () => {
      try {
        // mimic api call with a promise
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success(`Successfully deleted ${resource} from the database`);
      } catch (err: any) {
        toast.error(err.message || "Failed to delete product");
      } finally {
        onOpenChange?.(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({resourceIds.length})
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{resourceIds.length}</span>
            {resourceIds.length === 1 ? " order" : " resourceIds"} from the
            database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <LoaderIcon size={14} className="mr-2 animate-spin" />
            ) : (
              <Trash size={14} className="mr-2" />
            )}

            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
