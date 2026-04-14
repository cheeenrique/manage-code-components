import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Form } from './form';
import { FormField } from './form-field';
import { InputText } from '../inputs/input-text';
import { Button } from '../actions/button';

type DemoValues = { name: string; email: string };

function FormExample() {
  const form = useForm<DemoValues>({
    defaultValues: { name: '', email: '' },
  });
  const [sent, setSent] = React.useState<string | null>(null);

  return (
    <div className="w-full max-w-md space-y-4">
      <Form
        form={form}
        onSubmit={(data) => setSent(JSON.stringify(data, null, 2))}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputText label="Nome" placeholder="Seu nome" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputText
              label="E-mail"
              type="email"
              placeholder="voce@exemplo.com"
              {...field}
            />
          )}
        />
        <Button type="submit">Enviar</Button>
      </Form>
      {sent && (
        <pre className="rounded-md border bg-muted/40 p-3 text-xs">{sent}</pre>
      )}
    </div>
  );
}

const meta = {
  title: 'Form/Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

export const WithReactHookForm: StoryObj<typeof meta> = {
  render: () => <FormExample />,
};
