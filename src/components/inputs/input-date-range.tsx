import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface DateRange {
  from: string;
  to: string;
}

export interface InputDateRangeProps extends Omit<BaseInputProps, 'name'> {
  nameFrom?: string;
  nameTo?: string;
  labelFrom?: string;
  labelTo?: string;
  min?: string;
  max?: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export const InputDateRange = React.forwardRef<HTMLDivElement, InputDateRangeProps>(
  (
    {
      label,
      helperText,
      error,
      disabled,
      required,
      className,
      nameFrom = 'dateFrom',
      nameTo = 'dateTo',
      labelFrom = 'From',
      labelTo = 'To',
      min,
      max,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ from: e.target.value, to: value?.to ?? '' });
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ from: value?.from ?? '', to: e.target.value });
    };

    const inputClasses = cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
      'ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-destructive focus-visible:ring-destructive',
    );

    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {label && (
          <span className="text-sm font-medium leading-none">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </span>
        )}
        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <label htmlFor={nameFrom} className="text-xs text-muted-foreground">
              {labelFrom}
            </label>
            <input
              id={nameFrom}
              name={nameFrom}
              type="date"
              disabled={disabled}
              min={min}
              max={value?.to || max}
              value={value?.from ?? ''}
              onChange={handleFromChange}
              className={inputClasses}
            />
          </div>
          <div className="flex-1 space-y-1">
            <label htmlFor={nameTo} className="text-xs text-muted-foreground">
              {labelTo}
            </label>
            <input
              id={nameTo}
              name={nameTo}
              type="date"
              disabled={disabled}
              min={value?.from || min}
              max={max}
              value={value?.to ?? ''}
              onChange={handleToChange}
              className={inputClasses}
            />
          </div>
        </div>
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

InputDateRange.displayName = 'InputDateRange';
