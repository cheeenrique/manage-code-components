import * as React from 'react';
import { cn } from '../../lib/cn';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function Topbar({ logo, title, actions, children, className, ...props }: TopbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6',
        className,
      )}
      {...props}
    >
      {logo && <div className="shrink-0">{logo}</div>}
      {title && <h1 className="text-lg font-semibold">{title}</h1>}
      {children && <div className="flex-1">{children}</div>}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}
