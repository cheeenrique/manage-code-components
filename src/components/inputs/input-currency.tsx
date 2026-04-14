import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputCurrencyProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'onChange' | 'value' | 'type'> {
  prefix?: string;
  suffix?: string;
  locale?: string;
  currency?: string;
  decimalScale?: number;
  value?: number;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
}

function formatCurrency(
  value: number,
  locale: string,
  decimalScale: number,
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
  }).format(value);
}

function parseCurrency(value: string, locale: string): number | null {
  if (!value.trim()) return null;

  let cleaned: string;
  if (locale.startsWith('pt') || locale.startsWith('de') || locale.startsWith('fr')) {
    cleaned = value.replace(/[^\d,\-]/g, '').replace(',', '.');
  } else {
    cleaned = value.replace(/[^\d.\-]/g, '');
  }

  if (!cleaned || cleaned === '-' || cleaned === '.') return null;

  const num = parseFloat(cleaned);
  if (!Number.isFinite(num)) return null;
  return num;
}

function clampValue(value: number | null, min?: number, max?: number): number | null {
  if (value === null) return null;
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

export const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  (
    {
      name,
      label,
      placeholder = '0,00',
      helperText,
      error,
      disabled,
      required,
      className,
      prefix = 'R$',
      suffix,
      locale = 'pt-BR',
      currency = 'BRL',
      decimalScale = 2,
      value: controlledValue,
      onChange,
      min,
      max,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = React.useState('');
    const errorId = `${name}-error`;
    const helperId = `${name}-helper`;

    React.useEffect(() => {
      if (controlledValue !== undefined && controlledValue !== null) {
        setDisplayValue(formatCurrency(controlledValue, locale, decimalScale));
      }
    }, [controlledValue, locale, decimalScale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setDisplayValue(raw);

      const parsed = parseCurrency(raw, locale);
      onChange?.(parsed);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const parsed = clampValue(parseCurrency(displayValue, locale), min, max);
      if (parsed !== null) {
        setDisplayValue(formatCurrency(parsed, locale, decimalScale));
        onChange?.(parsed);
      } else if (!displayValue.trim()) {
        setDisplayValue('');
        onChange?.(null);
      }
      props.onBlur?.(e);
    };

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
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" aria-hidden="true">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={name}
            name={name}
            type="text"
            inputMode="decimal"
            placeholder={placeholder}
            disabled={disabled}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm',
              'ring-offset-background placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              prefix ? 'pl-10' : 'pl-3',
              suffix ? 'pr-10' : 'pr-3',
              error && 'border-destructive focus-visible:ring-destructive',
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" aria-hidden="true">
              {suffix}
            </span>
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

InputCurrency.displayName = 'InputCurrency';
