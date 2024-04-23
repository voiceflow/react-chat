import type { Meta, StoryObj } from '@storybook/react';

import Chat from '@/components/Chat';

import UserResponse from '.';

type Story = StoryObj<typeof UserResponse>;
const meta: Meta<typeof UserResponse> = {
  title: 'Components/Chat/UserResponse',
  component: UserResponse,
  args: {
    timestamp: Date.now(),
  },
  render: (args) => (
    <Chat.Container>
      <Chat.Dialog css={{ padding: '64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <UserResponse {...args} />
      </Chat.Dialog>
    </Chat.Container>
  ),
};

export default meta;

export const PlainText: Story = {
  args: {
    message: 'Lorem ipsum dolor',
  },
};

export const Wrapping: Story = {
  args: {
    message:
      'consecteturaconse cteturaconsecteturaconsecteturaconsecteturaconsectetura consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura',
  },
};

export const Debug: Story = {
  args: {
    message: 'Lorem ipsum dolor',
    debug: {
      message: 'Intent Name (97%)',
    },
  },
};

export const DebugReason: Story = {
  args: {
    message: 'Lorem ipsum dolor',
    debug: {
      message: 'Intent Name (97%)',
      reason: 'Voluptatum quae, accusamus excepturi inventore ex quos veritatis eaque ab non?',
    },
  },
};

export const ActionableDebugReason: Story = {
  args: {
    ...DebugReason.args,
    debug: {
      message: 'Intent Name (97%)',
      action: { label: 'Add Missing Utterance' },
    },
  },
};
