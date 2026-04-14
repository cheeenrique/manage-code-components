import * as React from 'react';
import { cn } from '../../lib/cn';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  // Pagination
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  // Sorting
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  // Selection
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = 'No data found.',
  className,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  sortKey,
  sortDirection,
  onSort,
  selectable = false,
  selectedKeys,
  onSelectionChange,
  onRowClick,
}: DataTableProps<T>) {
  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 1;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    const allKeys = new Set(data.map(keyExtractor));
    const allSelected = data.every((row) => selectedKeys?.has(keyExtractor(row)));
    onSelectionChange(allSelected ? new Set() : allKeys);
  };

  const handleSelectRow = (key: string) => {
    if (!onSelectionChange || !selectedKeys) return;
    const newKeys = new Set(selectedKeys);
    if (newKeys.has(key)) {
      newKeys.delete(key);
    } else {
      newKeys.add(key);
    }
    onSelectionChange(newKeys);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-md border overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              {selectable && (
                <th className="h-12 w-12 px-4">
                  <input
                    type="checkbox"
                    checked={data.length > 0 && data.every((row) => selectedKeys?.has(keyExtractor(row)))}
                    onChange={handleSelectAll}
                    className="rounded border-input"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                    col.sortable && 'cursor-pointer select-none hover:text-foreground',
                    col.className,
                  )}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-xs">{sortDirection === 'asc' ? '\u2191' : '\u2193'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const key = keyExtractor(row);
                return (
                  <tr
                    key={key}
                    className={cn(
                      'border-b transition-colors hover:bg-muted/50',
                      selectedKeys?.has(key) && 'bg-muted',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td className="w-12 px-4">
                        <input
                          type="checkbox"
                          checked={selectedKeys?.has(key) ?? false}
                          onChange={() => handleSelectRow(key)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-input"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={cn('p-4 align-middle', col.className)}>
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalItems !== undefined && (
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} ({totalItems} items)
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className={cn(
                'inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm',
                'disabled:pointer-events-none disabled:opacity-50',
                'hover:bg-accent hover:text-accent-foreground',
              )}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className={cn(
                'inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm',
                'disabled:pointer-events-none disabled:opacity-50',
                'hover:bg-accent hover:text-accent-foreground',
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
