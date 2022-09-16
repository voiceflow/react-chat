import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import UserResponse from '.';

export default {
  title: 'Components/Chat/UserResponse',
  component: UserResponse,
  args: {
    message: 'Lorem ipsum dolor sit amet consectetur',
    timestamp: new Date(),
  },
} as ComponentMeta<typeof UserResponse>;

const Template: ComponentStory<typeof UserResponse> = (args) => (
  <Chat.Container>
    <Chat.Dialog css={{ padding: '64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <UserResponse {...args} />
    </Chat.Dialog>
  </Chat.Container>
);

export const Simple = Template.bind({});

export const Debug = Template.bind({});
Debug.args = {
  debug: {
    message: 'Intent Name (97%)',
  },
};

export const DebugReason = Template.bind({});
DebugReason.args = {
  debug: {
    ...Debug.args.debug!,
    reason: 'Voluptatum quae, accusamus excepturi inventore ex quos veritatis eaque ab non?',
  },
};

export const ActionableDebugReason = Template.bind({});
ActionableDebugReason.args = {
  debug: {
    ...DebugReason.args.debug!,
    action: { label: 'Add Missing Utterance' },
  },
};
