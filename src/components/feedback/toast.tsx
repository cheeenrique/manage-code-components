import * as React from 'react';
import { cn } from '../../lib/cn';

export type ToastVariant = 'default' | 'destructive' | 'success';

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProps extends ToastData {
  onClose: (id: string) => void;
}

const variantClasses: Record<ToastVariant, string> = {
  default: 'bg-background text-foreground border',
  destructive: 'bg-destructive text-destructive-foreground border-destructive',
  success: 'bg-green-600 text-white border-green-600',
};

export function Toast({ id, title, description, variant = 'default', onClose }: ToastProps) {
  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        'animate-in slide-in-from-top-full fade-in-0',
        variantClasses[variant],
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => onClose(id)}
          className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

type ToastContextValue = {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    const duration = toast.duration ?? 5000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
