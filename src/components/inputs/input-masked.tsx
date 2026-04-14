import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputMaskedProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'onChange'> {
  mask: string;
  maskChar?: string;
  onChange?: (value: string, rawValue: string) => void;
}

function applyMask(value: string, mask: string): string {
  const raw = value.replace(/\D/g, '');
  let result = '';
  let rawIndex = 0;

  for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
    if (mask[i] === '9') {
      result += raw[rawIndex];
      rawIndex++;
    } else {
      result += mask[i];
      if (mask[i] === raw[rawIndex]) {
        rawIndex++;
      }
    }
  }

  return result;
}

function unmask(value: string): string {
  return value.replace(/\D/g, '');
}

function getMaxRawLength(mask: string): number {
  return (mask.match(/9/g) || []).length;
}

export const InputMasked = React.forwardRef<HTMLInputElement, InputMaskedProps>(
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
      mask,
      maskChar = '_',
      onChange,
      value: controlledValue,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState('');
    const value = controlledValue !== undefined ? String(controlledValue) : internalValue;
    const maxLength = getMaxRawLength(mask);
    const errorId = `${name}-error`;
    const helperId = `${name}-helper`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = unmask(e.target.value).slice(0, maxLength);
      const masked = applyMask(raw, mask);

      if (controlledValue === undefined) {
        setInternalValue(masked);
      }

      onChange?.(masked, raw);
    };

    const displayPlaceholder = placeholder || mask.replace(/9/g, maskChar);

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
        <input
          ref={ref}
          id={name}
          name={name}
          type="text"
          inputMode="numeric"
          placeholder={displayPlaceholder}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
          )}
          {...props}
        />
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

InputMasked.displayName = 'InputMasked';
