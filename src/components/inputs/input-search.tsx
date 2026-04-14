import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputSearchProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'type'> {
  onClear?: () => void;
}

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      name,
      label,
      placeholder = 'Search...',
      helperText,
      error,
      disabled,
      required,
      className,
      value,
      onClear,
      ...props
    },
    ref,
  ) => {
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={ref}
            id={name}
            name={name}
            type="search"
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-9 py-2 text-sm',
              'ring-offset-background placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              '[&::-webkit-search-cancel-button]:appearance-none',
              error && 'border-destructive focus-visible:ring-destructive',
            )}
            aria-invalid={!!error}
            {...props}
          />
          {value && onClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
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
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

InputSearch.displayName = 'InputSearch';
