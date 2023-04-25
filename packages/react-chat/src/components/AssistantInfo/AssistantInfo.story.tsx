import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';
import { VF_ICON } from '@/fixtures';

import AssistantInfo from '.';

export default {
  title: 'Components/Chat/AssistantInfo',
  component: AssistantInfo,
  args: {
    title: 'Assistant Name',
    description: "Voiceflow's virtual assistant is here to help.",
    avatar: VF_ICON,
  },
} as ComponentMeta<typeof AssistantInfo>;

const Template: ComponentStory<typeof AssistantInfo> = (args) => (
  <Chat.Container>
    <AssistantInfo {...args} />
  </Chat.Container>
);

export const Default = Template.bind({});
