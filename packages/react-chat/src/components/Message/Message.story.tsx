import { ComponentMeta, ComponentStory } from '@storybook/react';

import Message from '.';

export default {
  title: 'Core/Message',
  component: Message,
  argTypes: {
    variant: {
      options: Object.values(Message.Variant),
      control: { type: 'radio' },
      defaultValue: Message.Variant.CHAT,
    },
    from: {
      if: { arg: 'variant', eq: Message.Variant.CHAT },
      options: ['system', 'user'],
      control: { type: 'radio' },
      defaultValue: 'system',
    },
    orientation: {
      if: { arg: 'variant', eq: Message.Variant.DEBUG },
      options: ['left', 'right'],
      control: { type: 'radio' },
      defaultValue: 'left',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

export const SystemChat = Template.bind({});
SystemChat.args = {
  variant: Message.Variant.CHAT,
  from: 'system',
};

export const UserChat = Template.bind({});
UserChat.args = {
  ...SystemChat.args,
  from: 'user',
};

export const DebugLeft = Template.bind({});
DebugLeft.args = {
  variant: Message.Variant.DEBUG,
  orientation: 'left',
};

export const DebugRight = Template.bind({});
DebugRight.args = {
  ...DebugLeft.args,
  orientation: 'right',
};
