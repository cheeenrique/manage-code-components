import * as React from 'react';
import { cn } from '../../lib/cn';
import { useFormField } from '../../hooks/use-form-field';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const field = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={field?.formItemId}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
    );
  },
);

FormLabel.displayName = 'FormLabel';
