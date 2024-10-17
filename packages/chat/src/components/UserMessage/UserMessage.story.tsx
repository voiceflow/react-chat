import type { Meta, StoryObj } from '@storybook/react';

import { UserMessage } from './index';

type Story = StoryObj<typeof UserMessage>;

const shortMessage = 'Howdy folks how yall doing out there?';
export const LONG_MESSAGE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget diam neque. Donec semper urna quis viverra tincidunt. Aliquam luctus purus nulla, vel vehicula est malesuada quis. Duis maximus ipsum ligula, vitae consectetur dui gravida quis. Integer pretium, nisl nec dapibus fringilla, nunc nibh sagittis urna, in sollicitudin massa nulla sed justo. Mauris venenatis ac nulla eu rutrum. Cras sapien arcu, tristique sit amet velit sed, fermentum placerat felis.';

const meta: Meta<typeof UserMessage> = {
  title: 'Core/UserMessage',
  component: UserMessage,
};
export default meta;

export const Short: Story = {
  args: {
    children: shortMessage,
  },
};

export const Long: Story = {
  args: {
    children: LONG_MESSAGE,
  },
};

export const Green: Story = {
  args: {
    children: LONG_MESSAGE,
    color: 'green',
  },
};
