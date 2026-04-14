import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputDateProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'type'> {
  min?: string;
  max?: string;
}

export const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
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
      min,
      max,
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
        <input
          ref={ref}
          id={name}
          name={name}
          type="date"
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={!!error}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

InputDate.displayName = 'InputDate';
