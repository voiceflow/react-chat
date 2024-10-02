import type { Meta, StoryObj } from '@storybook/react';

import { MARKDOWN_FIXTURE } from './__fixtures__/markdown';
import { Message } from './Message.component';

type Story = StoryObj<typeof Message>;

const meta: Meta<typeof Message> = {
  title: 'Core/Message',
  component: Message,
};
export default meta;

export const Small: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur alir tuesil',
  },
};

export const Markdown: Story = {
  args: {
    children: MARKDOWN_FIXTURE,
  },
};
