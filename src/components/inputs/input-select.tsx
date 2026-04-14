import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface InputSelectProps
  extends BaseInputProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BaseInputProps> {
  options: (SelectOption | SelectGroup)[];
  emptyOption?: string;
}

function isGroup(item: SelectOption | SelectGroup): item is SelectGroup {
  return 'options' in item;
}

export const InputSelect = React.forwardRef<HTMLSelectElement, InputSelectProps>(
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
      options,
      emptyOption,
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
        <select
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={!!error}
          {...props}
        >
          {(emptyOption || placeholder) && (
            <option value="">{emptyOption || placeholder}</option>
          )}
          {options.map((item) =>
            isGroup(item) ? (
              <optgroup key={item.label} label={item.label}>
                {item.options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option key={item.value} value={item.value} disabled={item.disabled}>
                {item.label}
              </option>
            ),
          )}
        </select>
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

InputSelect.displayName = 'InputSelect';
