import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputTextareaProps
  extends BaseInputProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps> {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
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
      rows = 4,
      resize = 'vertical',
      ...props
    },
    ref,
  ) => {
    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

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
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            resizeClass,
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

InputTextarea.displayName = 'InputTextarea';
