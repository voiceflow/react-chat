import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import UserResponse from '.';

export default {
  title: 'Components/Chat/UserResponse',
  component: UserResponse,
  args: {
    timestamp: Date.now(),
  },
} as ComponentMeta<typeof UserResponse>;

const RawTemplate: ComponentStory<typeof UserResponse> = (args) => <UserResponse {...args} />;
const Template: ComponentStory<typeof UserResponse> = (args) => (
  <Chat.Container>
    <Chat.Dialog css={{ padding: '64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <RawTemplate {...args} />
    </Chat.Dialog>
  </Chat.Container>
);

export const Simple = Template.bind({});
Simple.args = {
  message: 'Lorem ipsum dolor',
};

export const Wrapping = Template.bind({});
Wrapping.args = {
  message: 'consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura',
};

export const Multiline = Template.bind({});
Multiline.args = {
  message: 'Lorem ipsum dolor sit amet consectetur',
};

export const Debug = Template.bind({});
Debug.args = {
  ...Multiline.args,
  debug: {
    message: 'Intent Name (97%)',
  },
};

export const DebugReason = Template.bind({});
DebugReason.args = {
  ...Debug.args,
  debug: {
    ...Debug.args.debug!,
    reason: 'Voluptatum quae, accusamus excepturi inventore ex quos veritatis eaque ab non?',
  },
};

export const ActionableDebugReason = Template.bind({});
ActionableDebugReason.args = {
  ...DebugReason.args,
  debug: {
    ...DebugReason.args.debug!,
    action: { label: 'Add Missing Utterance' },
  },
};
