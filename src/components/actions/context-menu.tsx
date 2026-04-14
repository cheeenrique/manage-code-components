import * as React from 'react';
import { cn } from '../../lib/cn';
import type { DropdownEntry } from './dropdown';

export interface ContextMenuProps {
  children: React.ReactNode;
  items: DropdownEntry[];
  className?: string;
}

function isSeparator(entry: DropdownEntry): entry is { type: 'separator' } {
  return 'type' in entry && entry.type === 'separator';
}

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  React.useEffect(() => {
    const handleClose = () => setOpen(false);

    if (open) {
      document.addEventListener('click', handleClose);
      document.addEventListener('scroll', handleClose);
    }

    return () => {
      document.removeEventListener('click', handleClose);
      document.removeEventListener('scroll', handleClose);
    };
  }, [open]);

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>
      {open && (
        <div
          className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 shadow-md"
          style={{ top: position.y, left: position.x }}
          role="menu"
        >
          {items.map((entry, i) =>
            isSeparator(entry) ? (
              <div key={i} className="-mx-1 my-1 h-px bg-muted" role="separator" />
            ) : (
              <button
                key={entry.value}
                role="menuitem"
                disabled={entry.disabled}
                onClick={() => {
                  entry.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                  'transition-colors hover:bg-accent hover:text-accent-foreground',
                  'disabled:pointer-events-none disabled:opacity-50',
                  entry.destructive && 'text-destructive hover:text-destructive',
                )}
              >
                {entry.icon && <span className="mr-2">{entry.icon}</span>}
                {entry.label}
              </button>
            ),
          )}
        </div>
      )}
    </>
  );
}
