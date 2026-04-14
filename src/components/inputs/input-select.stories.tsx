import type { Meta, StoryObj } from '@storybook/react';
import { InputSelect } from './input-select';

const options = [
  { label: 'Opção A', value: 'a' },
  { label: 'Opção B', value: 'b' },
  { label: 'Opção C', value: 'c' },
];

const meta = {
  title: 'Inputs/InputSelect',
  component: InputSelect,
  tags: ['autodocs'],
  args: {
    name: 'choice',
    label: 'Escolha',
    options,
  },
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEmptyOption: Story = {
  args: {
    emptyOption: 'Selecione…',
  },
};

export const WithError: Story = {
  args: {
    error: 'Escolha uma opção válida.',
  },
};
