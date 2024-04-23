import type { Meta, StoryObj } from '@storybook/react';

import type { SystemResponseProps } from '@/components/SystemResponse';
import SystemResponse from '@/components/SystemResponse';
import type { UserResponseProps } from '@/components/UserResponse';
import UserResponse from '@/components/UserResponse';
import { MOCK_IMAGE, VF_ICON } from '@/fixtures';

import Chat from '.';

const meta: Meta<typeof Chat> = {
  title: 'Templates/Chat',
  component: Chat,
  args: {
    isLoading: false,
    actions: [],
    title: 'Assistant Name',
    withWatermark: true,
    image: VF_ICON,
    description: "Voiceflow's virtual assistant is here to help.",
    startTime: Date.now(),
    hasEnded: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

const SystemResponseTemplate = ({ messages, ...args }: Partial<SystemResponseProps>) => {
  return <SystemResponse {...args} messages={messages as any} avatar={VF_ICON} timestamp={Date.now()} />;
};

const UserResponseTemplate = ({ message, ...args }: Partial<UserResponseProps>) => (
  <UserResponse timestamp={Date.now()} message={message || 'Lorem ipsum dolor'} {...args} />
);

export const Empty: Story = {};

export const Exhaustive: Story = {
  render: (args) => {
    return (
      <Chat {...args}>
        <SystemResponseTemplate messages={[{ type: 'text', text: 'Lorem ipsum dolor' }]} />
        <SystemResponseTemplate messages={[{ type: 'image', url: MOCK_IMAGE }]} />
        <UserResponseTemplate />
        <SystemResponseTemplate
          messages={[
            {
              type: 'text',
              text: 'Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consectetura',
            },
          ]}
        />
        <UserResponseTemplate message="Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consecteturac onsecteturaconsecteturaconsecteturaco nsecteturaconsectetura" />
        <SystemResponseTemplate
          messages={[
            {
              type: 'card',
              title: 'Card Message',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
              image: MOCK_IMAGE,
            },
          ]}
        />
      </Chat>
    );
  },
};
