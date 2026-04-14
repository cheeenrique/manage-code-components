import * as React from 'react';
import { cn } from '../../lib/cn';

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  sections: SidebarSection[];
  collapsed?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

function SidebarItemComponent({
  item,
  collapsed,
  depth = 0,
}: {
  item: SidebarItem;
  collapsed: boolean;
  depth?: number;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((v) => !v);
    }
    item.onClick?.();
  };

  const Tag = item.href ? 'a' : 'button';
  const tagProps = item.href ? { href: item.href } : { type: 'button' as const };

  return (
    <div>
      <Tag
        {...tagProps}
        onClick={handleClick}
        className={cn(
          'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          item.active && 'bg-accent text-accent-foreground font-medium',
          depth > 0 && 'ml-4',
        )}
        title={collapsed ? item.label : undefined}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
        {!collapsed && hasChildren && (
          <svg
            className={cn('h-4 w-4 shrink-0 transition-transform', expanded && 'rotate-90')}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </Tag>
      {!collapsed && expanded && hasChildren && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <SidebarItemComponent key={child.key} item={child} collapsed={collapsed} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  sections,
  collapsed = false,
  header,
  footer,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    >
      {header && <div className="border-b px-4 py-4">{header}</div>}
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {sections.map((section, i) => (
          <div key={i}>
            {section.title && !collapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItemComponent key={item.key} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      {footer && <div className="border-t px-4 py-4">{footer}</div>}
    </aside>
  );
}
