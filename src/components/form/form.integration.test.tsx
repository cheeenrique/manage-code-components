import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Form } from './form';
import { FormField } from './form-field';
import { InputText } from '../inputs/input-text';

function SubscribeForm({
  onSubmit,
}: {
  onSubmit: (data: { email: string }) => void;
}) {
  const form = useForm<{ email: string }>({
    defaultValues: { email: '' },
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <InputText label="E-mail" placeholder="a@b.c" {...field} />
        )}
      />
      <button type="submit">Enviar</button>
    </Form>
  );
}

describe('Form + FormField + InputText', () => {
  it('submits react-hook-form values', async () => {
    const onSubmit = vi.fn();
    render(<SubscribeForm onSubmit={onSubmit} />);

    const input = screen.getByRole('textbox', { name: 'E-mail' });
    fireEvent.change(input, { target: { value: 'dev@example.com' } });

    const formEl = input.closest('form');
    expect(formEl).not.toBeNull();
    fireEvent.submit(formEl!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith(
      { email: 'dev@example.com' },
      expect.anything(),
    );
  });
});
