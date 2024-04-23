import type { Meta, StoryObj } from '@storybook/react';

import Chat from '@/components/Chat';
import { VF_ICON } from '@/fixtures';

import type { AssistantInfoProps } from '.';
import AssistantInfo from '.';

type Story = StoryObj<typeof AssistantInfo>;

const meta: Meta<typeof AssistantInfo> = {
  title: 'Components/Chat/AssistantInfo',
  component: AssistantInfo,
  args: {
    title: 'Assistant Name',
    description: "Voiceflow's virtual assistant is here to help.",
    avatar: VF_ICON,
  },
};

export default meta;

export const Default: Story = {
  render: (args: AssistantInfoProps) => (
    <Chat.Container>
      <AssistantInfo {...args} />
    </Chat.Container>
  ),
};
