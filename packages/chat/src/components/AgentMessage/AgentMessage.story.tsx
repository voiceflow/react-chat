import type { Meta, StoryObj } from '@storybook/react';

import TEXT_TREATMENT_MARKDOWN from '@/__fixtures__/markdown/text-treatment.md?raw';

// import { useEffect, useState } from 'react';
// import CODE_RESPONSE_FIXTURE from './__fixtures__/code-response.md?raw';
// import CODE_SNIPPET_FIXTURE from './__fixtures__/inline-code.md?raw';
// import LISTS_FIXTURE from './__fixtures__/lists.md?raw';
// import TABLES_QUOTES_RULES from './__fixtures__/tables-quotes-rules.md?raw';
// import TEXT_TREATMENT_MARKDOWN from './__fixtures__/text-treatment.md?raw';
import { AgentMessage } from './index';

type Story = StoryObj<typeof AgentMessage>;

const shortMessage = 'Howdy folks how yall doing out there?';

const meta: Meta<typeof AgentMessage> = {
  title: 'Core/AgentMessage',
  component: AgentMessage,
};
export default meta;

export const Small: Story = {
  args: {
    children: shortMessage,
  },
};

export const AIGenerated: Story = {
  args: {
    children: shortMessage,
    generated: true,
  },
};

export const Markdown: Story = {
  args: {
    children: TEXT_TREATMENT_MARKDOWN,
  },
};

// export const InlineCode: Story = {
//   args: {
//     children: CODE_SNIPPET_FIXTURE,
//   },
// };

// export const CodeResponse: Story = {
//   args: {
//     children: CODE_RESPONSE_FIXTURE,
//   },
// };

// export const Tables: Story = {
//   args: {
//     children: TABLES_QUOTES_RULES,
//   },
// };

// export const Lists: Story = {
//   args: {
//     children: LISTS_FIXTURE,
//   },
// };

// const StreamingExample = ({ message }: { message: string }) => {
//   const [text, setText] = useState('');

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setText(message.slice(0, index + 1));
//       index++;
//       if (index === message.length) {
//         clearInterval(interval);
//       }
//     }, 5);

//     return () => clearInterval(interval);
//   }, [message]);

//   return <AgentMessage from="system">{text}</AgentMessage>;
// };

// export const Streaming: Story = {
//   render: () => <StreamingExample message={shortMessage} />,
//   parameters: {
//     chromatic: { disableSnapshot: true },
//   },
// };

// export const StreamingFullMarkdown: Story = {
//   render: () => <StreamingExample message={TEXT_TREATMENT_MARKDOWN} />,
//   parameters: {
//     chromatic: { disableSnapshot: true },
//   },
// };
