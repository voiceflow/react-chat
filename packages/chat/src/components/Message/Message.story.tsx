import type { Meta, StoryObj } from '@storybook/react';

import { MARKDOWN_FIXTURE } from './__fixtures__/markdown';
import { Message } from './Message.component';

type Story = StoryObj<typeof Message>;

const meta: Meta<typeof Message> = {
  title: 'Core/Message',
  component: Message,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '25%' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
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

export const CodeBlock: Story = {
  args: {
    children: `
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
`,
  },
};
