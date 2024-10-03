import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { MARKDOWN_FIXTURE } from './__fixtures__/markdown';
import { Message } from './Message.component';

type Story = StoryObj<typeof Message>;

const shortMessage = 'Howdy folks how yall doing out there?';

const codeMessage = `
\`\`\`javascript
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: 'howdy folks, very cool verification hash here' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
\`\`\`
`;

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

export const CodeBlock: Story = {
  args: {
    children: codeMessage,
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
  render: () => <StreamingExample message={codeMessage} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
