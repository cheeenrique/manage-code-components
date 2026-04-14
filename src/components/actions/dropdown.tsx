import * as React from 'react';
import { cn } from '../../lib/cn';

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DropdownSeparator {
  type: 'separator';
}

export type DropdownEntry = DropdownItem | DropdownSeparator;

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownEntry[];
  align?: 'start' | 'end';
  className?: string;
  'aria-label'?: string;
}

function isSeparator(entry: DropdownEntry): entry is DropdownSeparator {
  return 'type' in entry && entry.type === 'separator';
}

function getActionItems(items: DropdownEntry[]): DropdownItem[] {
  return items.filter((e): e is DropdownItem => !isSeparator(e));
}

export function Dropdown({ trigger, items, align = 'end', className, ...ariaProps }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  const actionItems = getActionItems(items);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
    }
  }, [open]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const enabledItems = actionItems.filter((item) => !item.disabled);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = activeIndex < enabledItems.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(next);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = activeIndex > 0 ? activeIndex - 1 : enabledItems.length - 1;
        setActiveIndex(prev);
        break;
      }
      case 'Home': {
        e.preventDefault();
        setActiveIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setActiveIndex(enabledItems.length - 1);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < enabledItems.length) {
          enabledItems[activeIndex].onClick?.();
          setOpen(false);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        setOpen(false);
        break;
      }
      case 'Tab': {
        setOpen(false);
        break;
      }
    }
  };

  React.useEffect(() => {
    if (open && menuRef.current && activeIndex >= 0) {
      const buttons = menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]');
      buttons[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={ariaProps['aria-label']}
      >
        {trigger}
      </div>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className={cn(
            'absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            align === 'end' ? 'right-0' : 'left-0',
          )}
          role="menu"
          aria-label={ariaProps['aria-label']}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((entry, i) =>
            isSeparator(entry) ? (
              <div key={i} className="-mx-1 my-1 h-px bg-muted" role="separator" />
            ) : (
              <button
                key={entry.value}
                role="menuitem"
                tabIndex={-1}
                disabled={entry.disabled}
                onClick={() => {
                  entry.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                  'transition-colors hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground',
                  'disabled:pointer-events-none disabled:opacity-50',
                  entry.destructive && 'text-destructive hover:text-destructive',
                )}
              >
                {entry.icon && <span className="mr-2" aria-hidden="true">{entry.icon}</span>}
                {entry.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
