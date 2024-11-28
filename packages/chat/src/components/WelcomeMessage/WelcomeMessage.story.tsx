import type { Meta, StoryObj } from '@storybook/react';

import EMPTY_IMAGE from '@/__fixtures__/empty-image.png';
import { widgetContainer } from '@/views/ChatWidget/styles.css';

import { WelcomeMessage } from '.';

type Story = StoryObj<typeof WelcomeMessage>;

const meta: Meta<typeof WelcomeMessage> = {
  title: 'Core/WelcomeMessage',
  component: WelcomeMessage,
  args: {
    avatar: EMPTY_IMAGE,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={widgetContainer.classNames.variants.withChat.true}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Base: Story = {
  args: {
    avatar: EMPTY_IMAGE,
    title: 'Agent name',
    description: 'Agent description.',
  },
};

export const LongContent: Story = {
  args: {
    avatar: EMPTY_IMAGE,
    title:
      'Hello, I am your #1 favourite AI assistant, meant to help you out in all sorts of ways. Hello, I am your #1 favourite AI assistant, meant to help you out in all sorts of ways. Hello, I am your #1 favourite AI assistant, meant to help you out in all sorts of ways. Hello, I am your #1 favourite AI assistant, meant to help you out in all sorts of ways. Hello, I am your #1 favourite AI assistant, meant to help you out in all sorts of ways.',
    description:
      'I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything! I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything! I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything!I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything! I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything! I can do tons of stuff, like help you with your account, answer questions, and even tell you a joke or two. Just ask me anything!',
  },
  render: (args) => (
    <div>
      Mock container
      <div style={{ border: '1px solid black' }}>
        <WelcomeMessage {...args} />
      </div>
    </div>
  ),
};
