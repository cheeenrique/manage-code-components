import * as React from 'react';
import { cn } from '../../lib/cn';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-background text-foreground border',
  destructive: 'border-destructive/50 text-destructive bg-destructive/10',
  success: 'border-green-500/50 text-green-700 bg-green-50',
  warning: 'border-yellow-500/50 text-yellow-700 bg-yellow-50',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, icon, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        <div className="flex gap-3">
          {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
          <div className="flex-1">
            {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
            {children && <div className="text-sm [&_p]:leading-relaxed">{children}</div>}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Alert.displayName = 'Alert';
