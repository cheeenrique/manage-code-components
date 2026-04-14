import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './toast';
import { Button } from '../actions/button';

function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          addToast({ title: 'Salvo', description: 'Suas alterações foram guardadas.' })
        }
      >
        Toast padrão
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          addToast({
            title: 'Erro',
            description: 'Tente novamente.',
            variant: 'destructive',
          })
        }
      >
        Destructive
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          addToast({
            title: 'Concluído',
            variant: 'success',
          })
        }
      >
        Sucesso
      </Button>
    </div>
  );
}

const meta = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;

export const Playground: StoryObj<typeof meta> = {
  render: () => <ToastDemo />,
};
