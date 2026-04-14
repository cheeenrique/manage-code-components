import * as React from 'react';
import { cn } from '../../lib/cn';
import { useFocusTrap } from '../../hooks/use-focus-trap';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: DrawerSide;
  title?: string;
  className?: string;
  width?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const slideClasses: Record<DrawerSide, string> = {
  left: 'left-0 animate-in slide-in-from-left',
  right: 'right-0 animate-in slide-in-from-right',
};

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  title,
  className,
  width = 'w-80',
  ...ariaProps
}: DrawerProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaProps['aria-labelledby'] || (title ? titleId : undefined)}
        aria-describedby={ariaProps['aria-describedby']}
        className={cn(
          'fixed top-0 z-50 h-full border bg-background p-6 shadow-lg',
          width,
          slideClasses[side],
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 id={titleId} className="text-lg font-semibold">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
