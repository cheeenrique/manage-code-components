import * as React from 'react';
import { cn } from '../../lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const defaultSeparator = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)} {...props}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const Tag = item.href ? 'a' : item.onClick ? 'button' : 'span';
          const tagProps = item.href
            ? { href: item.href }
            : item.onClick
              ? { type: 'button' as const, onClick: item.onClick }
              : {};

          return (
            <React.Fragment key={i}>
              <li>
                <Tag
                  {...tagProps}
                  className={cn(
                    isLast
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground transition-colors',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </Tag>
              </li>
              {!isLast && (
                <li role="presentation" aria-hidden="true">
                  {separator || defaultSeparator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
