import { Meta, StoryObj } from '@storybook/react';

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
} as Meta<typeof AssistantInfo>;

const Template: StoryObj<typeof AssistantInfo> = (args) => (
  <Chat.Container>
    <AssistantInfo {...args} />
  </Chat.Container>
);

export const Default = Template.bind({});
