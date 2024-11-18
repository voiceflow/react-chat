import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from '.';

type Story = StoryObj<typeof Separator>;

const meta: Meta<typeof Separator> = {
  title: 'Components/Chat/Separator',
  component: Separator,
};

export default meta;

export const Default: Story = {
  args: {
    text: 'Chat has ended',
  },
};
