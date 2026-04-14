import * as React from 'react';
import { cn } from '../../lib/cn';

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

export function ChartCard({
  title,
  description,
  actions,
  children,
  loading = false,
  className,
  ...props
}: ChartCardProps) {
  return (
    <div
      className={cn('rounded-lg border bg-background shadow-sm', className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="p-6">
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
