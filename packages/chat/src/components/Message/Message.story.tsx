import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { CODE_SNIPPET_FIXTURE } from './__fixtures__/code-snippet';
import FULL_MARKDOWN_FIXTURE from './__fixtures__/full-markdown.md?raw'; // Ensure the file exists at this path
import { MARKDOWN_FIXTURE } from './__fixtures__/markdown';
import { Message } from './Message.component';

type Story = StoryObj<typeof Message>;

const shortMessage = 'Howdy folks how yall doing out there?';

const meta: Meta<typeof Message> = {
  title: 'Core/Message',
  component: Message,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '25%' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Small: Story = {
  args: {
    children: shortMessage,
  },
};

export const Markdown: Story = {
  args: {
    children: MARKDOWN_FIXTURE,
  },
};

export const FullMarkdown: Story = {
  args: {
    children: FULL_MARKDOWN_FIXTURE,
  },
};

export const CodeBlock: Story = {
  args: {
    children: CODE_SNIPPET_FIXTURE,
  },
};

const StreamingExample = ({ message }: { message: string }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, index + 1));
      index++;
      if (index === message.length) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [message]);

  return <Message>{text}</Message>;
};

export const Streaming: Story = {
  render: () => <StreamingExample message={shortMessage} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const StreamingFullMarkdown: Story = {
  render: () => <StreamingExample message={MARKDOWN_FIXTURE} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const StreamingCode: Story = {
  render: () => <StreamingExample message={CODE_SNIPPET_FIXTURE} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
