import * as React from 'react';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputOTPProps extends Omit<BaseInputProps, 'placeholder'> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric';
}

function sanitize(value: string, type: 'numeric' | 'alphanumeric'): string {
  if (type === 'numeric') return value.replace(/\D/g, '');
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      name,
      label,
      helperText,
      error,
      disabled,
      required,
      className,
      length = 6,
      value: controlledValue,
      onChange,
      onComplete,
      type = 'numeric',
    },
    ref,
  ) => {
    const [values, setValues] = React.useState<string[]>(Array(length).fill(''));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const errorId = `${name}-error`;
    const helperId = `${name}-helper`;

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        const sanitized = sanitize(controlledValue, type);
        const chars = sanitized.split('').slice(0, length);
        setValues([...chars, ...Array(length - chars.length).fill('')]);
      }
    }, [controlledValue, length, type]);

    const focusInput = (index: number) => {
      inputRefs.current[index]?.focus();
    };

    const updateValues = (newValues: string[]) => {
      setValues(newValues);
      const joined = newValues.join('');
      onChange?.(joined);

      if (newValues.every((v) => v !== '') && joined.length === length) {
        onComplete?.(joined);
      }
    };

    const handleChange = (index: number, char: string) => {
      const clean = sanitize(char, type);
      if (!clean && char) return;

      const newValues = [...values];
      newValues[index] = clean.slice(-1);
      updateValues(newValues);

      if (clean && index < length - 1) {
        focusInput(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          const newValues = [...values];
          newValues[index - 1] = '';
          updateValues(newValues);
          focusInput(index - 1);
        }
      }
      if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1);
      }
      if (e.key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = sanitize(e.clipboardData.getData('text/plain'), type).slice(0, length);
      if (!pasted) return;

      const chars = pasted.split('');
      const newValues = Array(length).fill('') as string[];
      chars.forEach((c, i) => {
        newValues[i] = c;
      });
      updateValues(newValues);

      if (chars.length >= length) {
        inputRefs.current[length - 1]?.focus();
      } else {
        focusInput(Math.min(chars.length, length - 1));
      }
    };

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div ref={ref} className={cn('space-y-2', className)} role="group" aria-label={label || 'One-time code'}>
        {label && (
          <span className="text-sm font-medium leading-none">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </span>
        )}
        <div className="flex gap-2">
          {values.map((val, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              pattern={type === 'numeric' ? '[0-9]*' : '[a-zA-Z0-9]*'}
              maxLength={1}
              name={`${name}-${i}`}
              value={val}
              disabled={disabled}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              className={cn(
                'flex h-12 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-medium',
                'ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive focus-visible:ring-destructive',
              )}
              aria-label={`Digit ${i + 1} of ${length}`}
              aria-describedby={i === 0 ? describedBy : undefined}
            />
          ))}
        </div>
        <input type="hidden" name={name} value={values.join('')} />
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

InputOTP.displayName = 'InputOTP';
