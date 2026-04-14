import * as React from 'react';
import { cn } from '../../lib/cn';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export function Tabs({
  items,
  value,
  onChange,
  variant = 'default',
  className,
  ...props
}: TabsProps) {
  const baseClasses = {
    default: 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    pills: 'inline-flex items-center gap-2',
    underline: 'inline-flex items-center gap-4 border-b',
  };

  const itemClasses = {
    default: (active: boolean) =>
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
        'ring-offset-background transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        active && 'bg-background text-foreground shadow-sm',
      ),
    pills: (active: boolean) =>
      cn(
        'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted hover:text-foreground',
      ),
    underline: (active: boolean) =>
      cn(
        'inline-flex items-center justify-center pb-3 text-sm font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'border-b-2 border-primary text-foreground'
          : 'text-muted-foreground hover:text-foreground',
      ),
  };

  return (
    <div
      role="tablist"
      className={cn(baseClasses[variant], className)}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.key}
          role="tab"
          type="button"
          aria-selected={value === item.key}
          disabled={item.disabled}
          onClick={() => onChange(item.key)}
          className={itemClasses[variant](value === item.key)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
