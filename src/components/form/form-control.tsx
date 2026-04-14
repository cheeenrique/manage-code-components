import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFormField } from '../../hooks/use-form-field';

export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}

export const FormControl = React.forwardRef<HTMLElement, FormControlProps>(
  ({ ...props }, ref) => {
    const field = useFormField();

    if (!field) {
      return <Slot ref={ref} {...props} />;
    }

    return (
      <Slot
        ref={ref}
        id={field.formItemId}
        aria-describedby={`${field.formDescriptionId} ${field.formMessageId}`}
        aria-invalid={false}
        {...props}
      />
    );
  },
);

FormControl.displayName = 'FormControl';
