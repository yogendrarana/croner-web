'use client';

import { z } from 'zod';
import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type TableOptions,
  type TableState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useDebounce } from '@/hooks/use-debounce';
import { useQueryString } from '@/hooks/use-query-string';
import type { DataTableFilterField } from '@/types/data-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface UseDataTableProps<TData>
  extends Omit<TableOptions<TData>, 'pageCount' | 'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'>,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  filterFields?: DataTableFilterField<TData>[];
  method?: 'push' | 'replace';
  scroll?: boolean;
  startTransition?: React.TransitionStartFunction;
  debounceMs?: number;
  throttleMs?: number;
  clearOnDefault?: boolean;
  shallow?: boolean;
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: {
      id: Extract<keyof TData, string>;
      desc: boolean;
    }[];
  };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
});

const PAGE_KEY = "page";
const PER_PAGE_KEY = "perPage";
const SORT_KEY = "sort";
const ARRAY_SEPARATOR = ",";
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  method = 'replace',
  scroll = false,
  shallow = true,
  clearOnDefault = false,
  startTransition,
  debounceMs = DEBOUNCE_MS,
  throttleMs = THROTTLE_MS,
  initialState,
  ...tableProps
}: UseDataTableProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search params
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));

  const page = search.page;
  const perPage = search.per_page ?? initialState?.pagination?.pageSize ?? 10;

  const sort = search.sort ?? `${initialState?.sorting?.[0]?.id}.${initialState?.sorting?.[0]?.desc ? 'desc' : 'asc'}`;
  const [column, order] = sort?.split('.') ?? [];

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter(field => !field.options),
      filterableColumns: filterFields.filter(field => field.options),
    };
  }, [filterFields]);

  // Create query string
  const { createQueryString } = useQueryString(searchParams);

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>((filters, [key, value]) => {
      const filterableColumn = filterableColumns.find(column => column.value === key);
      const searchableColumn = searchableColumns.find(column => column.value === key);

      if (filterableColumn) {
        filters.push({
          id: key,
          value: value.split('.'),
        });
      } else if (searchableColumn) {
        filters.push({
          id: key,
          value: [value],
        });
      }

      return filters;
    }, []);
  }, [filterableColumns, searchableColumns, searchParams]);

  // Table states
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialColumnFilters);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: perPage,
  });

  const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  // Handle server-side sorting
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: column ?? '',
      desc: order === 'desc',
    },
  ]);

  React.useEffect(() => {
    function onUrlChange() {
      const url = `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
        sort: sorting[0]?.id ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}` : null,
      })}`;

      method === 'push' ? router.push(url, { scroll }) : router.replace(url, { scroll });
    }

    startTransition
      ? startTransition(() => {
          onUrlChange();
        })
      : onUrlChange();
  }, [pageIndex, pageSize, sorting, method, scroll]);

  // Handle server-side filtering
  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter(filter => {
          return searchableColumns.find(column => column.value === filter.id);
        }),
      ),
      500,
    ),
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter(filter => {
    return filterableColumns.find(column => column.value === filter.id);
  });

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Prevent resetting the page on initial render
    if (!mounted) {
      setMounted(true);
      return;
    }

    // Initialize new params
    const newParamsObject = {
      page: 1,
    };

    // Handle debounced searchable column filters
    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === 'string') {
        Object.assign(newParamsObject, {
          [column.id]: typeof column.value === 'string' ? column.value : null,
        });
      }
    }

    // Handle filterable column filters
    for (const column of filterableColumnFilters) {
      if (typeof column.value === 'object' && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join('.') });
      }
    }

    // Remove deleted values
    for (const key of searchParams.keys()) {
      if (
        (searchableColumns.find(column => column.value === key) && !debouncedSearchableColumnFilters.find(column => column.id === key)) ||
        (filterableColumns.find(column => column.value === key) && !filterableColumnFilters.find(column => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null });
      }
    }

    // After cumulating all the changes, push new params
    function onUrlChange() {
      const url = `${pathname}?${createQueryString(newParamsObject)}`;

      method === 'push' ? router.push(url, { scroll }) : router.replace(url, { scroll });
    }

    startTransition
      ? startTransition(() => {
          onUrlChange();
        })
      : onUrlChange();

    table.setPageIndex(0);
  }, [JSON.stringify(debouncedSearchableColumnFilters), JSON.stringify(filterableColumnFilters), method, scroll]);

  const table = useReactTable({
    ...tableProps,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { table };
}
