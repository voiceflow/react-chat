import { ComponentMeta, ComponentStory } from '@storybook/react';

import { VF_ICON } from '@/fixtures';

import Avatar from '.';

export default {
  title: 'Core/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
      defaultValue: 'small',
    },
  },
  args: {
    avatar: VF_ICON,
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
