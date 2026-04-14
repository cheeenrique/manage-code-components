import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Botão',
    variant: 'default' as const,
    size: 'default' as const,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Excluir' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Secundário' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Salvando…' },
};
