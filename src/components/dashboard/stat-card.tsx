import * as React from 'react';
import { cn } from '../../lib/cn';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  ...props
}: StatCardProps) {
  const isPositive = trend && trend.value >= 0;

  return (
    <div
      className={cn(
        'rounded-lg border bg-background p-6 shadow-sm',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {(description || trend) && (
          <div className="mt-1 flex items-center gap-1 text-xs">
            {trend && (
              <span className={cn('font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
                {isPositive ? '+' : ''}
                {trend.value}%
              </span>
            )}
            {(description || trend?.label) && (
              <span className="text-muted-foreground">{description || trend?.label}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
