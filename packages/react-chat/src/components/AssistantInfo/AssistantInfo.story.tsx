import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import AssistantInfo from '.';

export default {
  title: 'Components/Chat/AssistantInfo',
  component: AssistantInfo,
  args: {
    title: 'Assistant Name',
    description: "Voiceflow's virtual assistant is here to help.",
    image: 'https://source.unsplash.com/random/72x72',
  },
} as ComponentMeta<typeof AssistantInfo>;

const Template: ComponentStory<typeof AssistantInfo> = (args) => (
  <Chat.Container>
    <AssistantInfo {...args} />
  </Chat.Container>
);

export const Default = Template.bind({});
