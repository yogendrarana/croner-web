import React from 'react';
import { MoreHorizontal, Pencil, Play, Pause, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CronJobSelect } from '@/server/db/schema';

interface PropType {
  job: CronJobSelect;
}

export default function CronjobTableRowActions({ job }: PropType) {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Play className="mr-2 h-4 w-4" />
            Run Now
          </DropdownMenuItem>
          {job.active ? (
            <DropdownMenuItem>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Play className="mr-2 h-4 w-4" />
              Resume
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
