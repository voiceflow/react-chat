import { ComponentMeta, ComponentStory } from '@storybook/react';

import SystemResponse, { SystemResponseProps } from '@/components/SystemResponse';
import * as SystemResponseStory from '@/components/SystemResponse/SystemResponse.story';
import UserResponse, { UserResponseProps } from '@/components/UserResponse';
import * as UserResponseStory from '@/components/UserResponse/UserResponse.story';
import { VF_ICON } from '@/fixtures';

import Chat from '.';

export default {
  title: 'Templates/Chat',
  component: Chat,
  args: {
    title: 'Assistant Name',
    image: VF_ICON,
    description: "Voiceflow's virtual assistant is here to help.",
    startTime: Date.now(),
    isOpen: true,
  },
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = (args) => <Chat {...args} />;
const SystemResponseTemplate = (args: Partial<SystemResponseProps>) => (
  <SystemResponse {...(SystemResponseStory.default.args as SystemResponseProps)} {...args} />
);
const UserResponseTemplate = (args: Partial<UserResponseProps>) => (
  <UserResponse {...(UserResponseStory.default.args as UserResponseProps)} {...args} />
);

export const Empty = Template.bind({});

export const Exhaustive = Template.bind({});
Exhaustive.args = {
  children: (
    <>
      <SystemResponseTemplate {...SystemResponseStory.SimpleText.args} />
      <UserResponseTemplate {...UserResponseStory.Simple.args} />
      <SystemResponseTemplate {...SystemResponseStory.MultilineText.args} />
      <UserResponseTemplate {...UserResponseStory.Multiline.args} />
      <SystemResponseTemplate {...SystemResponseStory.WrappingText.args} />
      <UserResponseTemplate {...UserResponseStory.Wrapping.args} />
      <SystemResponseTemplate {...SystemResponseStory.Image.args} />
      <UserResponseTemplate {...UserResponseStory.Debug.args} />
      <SystemResponseTemplate {...SystemResponseStory.Card.args} />
      <UserResponseTemplate {...UserResponseStory.DebugReason.args} />
      <SystemResponseTemplate {...SystemResponseStory.ActionableCard.args} />
      <UserResponseTemplate {...UserResponseStory.ActionableDebugReason.args} />
      <SystemResponseTemplate {...SystemResponseStory.Multiple.args} />

      <UserResponseTemplate {...UserResponseStory.ActionableDebugReason.args} />
      <SystemResponseTemplate {...SystemResponseStory.MultipleWithFeedback.args} />
    </>
  ),
};
