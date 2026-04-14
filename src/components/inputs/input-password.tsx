import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputPasswordProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'type'> {
  toggleVisibility?: boolean;
  autoComplete?: 'current-password' | 'new-password' | 'off';
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      name,
      label,
      placeholder,
      helperText,
      error,
      disabled,
      required,
      className,
      toggleVisibility = true,
      autoComplete = 'current-password',
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(false);
    const errorId = `${name}-error`;
    const helperId = `${name}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
              'ring-offset-background placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              toggleVisibility && 'pr-10',
              error && 'border-destructive focus-visible:ring-destructive',
            )}
            {...props}
          />
          {toggleVisibility && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>
        {helperText && !error && (
          <p id={helperId} className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-destructive" role="alert">{error}</p>
        )}
      </div>
    );
  },
);

InputPassword.displayName = 'InputPassword';
