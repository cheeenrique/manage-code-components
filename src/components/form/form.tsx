import * as React from 'react';
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { cn } from '../../lib/cn';

export interface FormProps<T extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  csrfToken?: string;
}

function FormInner<T extends FieldValues = FieldValues>(
  { form, onSubmit, children, className, csrfToken, ...props }: FormProps<T>,
  ref: React.ForwardedRef<HTMLFormElement>,
) {
  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        noValidate
        {...props}
      >
        {csrfToken && (
          <input type="hidden" name="_csrf" value={csrfToken} />
        )}
        {children}
      </form>
    </FormProvider>
  );
}

export const Form = React.forwardRef(FormInner) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;
