import * as React from 'react';
import { cn } from '../../lib/cn';
import { useFormField } from '../../hooks/use-form-field';

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const field = useFormField();

    const body = children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={field?.formMessageId}
        className={cn('text-sm font-medium text-destructive', className)}
        {...props}
      >
        {body}
      </p>
    );
  },
);

FormMessage.displayName = 'FormMessage';
