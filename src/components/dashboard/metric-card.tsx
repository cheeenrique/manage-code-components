import * as React from 'react';
import { cn } from '../../lib/cn';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantClasses = {
  default: '',
  primary: 'border-primary/20 bg-primary/5',
  success: 'border-green-500/20 bg-green-50',
  warning: 'border-yellow-500/20 bg-yellow-50',
  danger: 'border-red-500/20 bg-red-50',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  footer,
  variant = 'default',
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-background p-6 shadow-sm',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && <div className="rounded-md bg-muted p-2">{icon}</div>}
      </div>
      {footer && <div className="mt-4 border-t pt-4 text-sm">{footer}</div>}
    </div>
  );
}
