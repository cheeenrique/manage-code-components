import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './dialog';
import type { DialogProps } from './dialog';
import { Button } from '../actions/button';

function DialogHarness(
  props: Omit<DialogProps, 'open' | 'onClose' | 'onConfirm'>,
) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Abrir diálogo
      </Button>
      <Dialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}

const meta = {
  title: 'Feedback/Dialog',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Confirm: StoryObj<typeof meta> = {
  render: () => (
    <DialogHarness
      title="Excluir item?"
      description="Esta ação é permanente."
      confirmLabel="Excluir"
      cancelLabel="Voltar"
    />
  ),
};

export const Destructive: StoryObj<typeof meta> = {
  render: () => (
    <DialogHarness
      title="Remover conta"
      description="Todos os dados serão apagados."
      variant="destructive"
      confirmLabel="Remover"
      cancelLabel="Cancelar"
    />
  ),
};
