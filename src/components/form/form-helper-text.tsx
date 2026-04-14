import * as React from 'react';
import { cn } from '../../lib/cn';
import { useFormField } from '../../hooks/use-form-field';

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, ...props }, ref) => {
    const field = useFormField();

    return (
      <p
        ref={ref}
        id={field?.formDescriptionId}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  },
);

FormHelperText.displayName = 'FormHelperText';
