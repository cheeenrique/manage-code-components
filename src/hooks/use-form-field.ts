import * as React from 'react';

export type FormFieldContextValue = {
  name: string;
};

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<FormItemContextValue | null>(null);

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    return null;
  }

  const id = itemContext?.id ?? fieldContext.name;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
}
