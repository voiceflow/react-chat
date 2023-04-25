import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import Prompt from '.';

export default {
  title: 'Components/Chat/Prompt',
  component: Prompt,
  args: {
    cancel: { label: 'Cancel' },
  },
} as ComponentMeta<typeof Prompt>;

const Template: ComponentStory<typeof Prompt> = (args) => (
  <Chat.Container withPrompt>
    <div style={{ height: 250, backgroundColor: 'lavender' }} />
    <Prompt {...args} />
  </Chat.Container>
);

export const Default = Template.bind({});
Default.args = {
  accept: { label: 'Primary Action' },
};

export const Dangerous = Template.bind({});
Dangerous.args = {
  accept: { label: 'Dangerous Action', type: 'warn' },
};
