import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
  args: {
    className: 'h-12 w-full',
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 rounded-lg border p-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};
