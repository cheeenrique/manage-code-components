import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from './input-text';

const meta = {
  title: 'Inputs/InputText',
  component: InputText,
  tags: ['autodocs'],
  args: {
    name: 'email',
    label: 'E-mail',
    placeholder: 'voce@exemplo.com',
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: 'Usamos só para login.' },
};

export const WithError: Story = {
  args: { error: 'Informe um e-mail válido.' },
};

export const Required: Story = {
  args: { required: true },
};
