import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Atenção',
    children: <p className="text-sm">Descrição opcional do alerta.</p>,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Erro',
    children: 'Não foi possível salvar.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Tudo certo',
    children: 'Alterações salvas com sucesso.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Aviso',
    children: 'Esta ação não pode ser desfeita.',
  },
};
