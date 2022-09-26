import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SystemResponseProps } from '@/components/SystemResponse';
import * as SystemResponse from '@/components/SystemResponse/SystemResponse.story';
import * as UserResponse from '@/components/UserResponse/UserResponse.story';

import { UserResponseProps } from '../UserResponse';
import Chat from '.';

export default {
  title: 'Templates/Chat',
  component: Chat,
  args: {
    title: 'Assistant Name',
    image: 'https://source.unsplash.com/random/72x72',
    description: "Voiceflow's virtual assistant is here to help.",
    startTime: new Date(),
  },
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = (args) => <Chat {...args} />;
const SystemResponseTemplate = (args: Partial<SystemResponseProps>) => (
  <SystemResponse.RawTemplate {...(SystemResponse.default.args as SystemResponseProps)} {...args} />
);
const UserResponseTemplate = (args: Partial<UserResponseProps>) => (
  <UserResponse.RawTemplate {...(UserResponse.default.args as UserResponseProps)} {...args} />
);

export const Empty = Template.bind({});

export const Exhaustive = Template.bind({});
Exhaustive.args = {
  children: (
    <>
      <SystemResponseTemplate {...SystemResponse.SimpleText.args} />
      <UserResponseTemplate {...UserResponse.Simple.args} />
      <SystemResponseTemplate {...SystemResponse.MultilineText.args} />
      <UserResponseTemplate {...UserResponse.Multiline.args} />
      <SystemResponseTemplate {...SystemResponse.WrappingText.args} />
      <UserResponseTemplate {...UserResponse.Wrapping.args} />
      <SystemResponseTemplate {...SystemResponse.Image.args} />
      <UserResponseTemplate {...UserResponse.Debug.args} />
      <SystemResponseTemplate {...SystemResponse.Card.args} />
      <UserResponseTemplate {...UserResponse.DebugReason.args} />
      <SystemResponseTemplate {...SystemResponse.ActionableCard.args} />
      <UserResponseTemplate {...UserResponse.ActionableDebugReason.args} />
      <SystemResponseTemplate {...SystemResponse.Multiple.args} />
    </>
  ),
};
