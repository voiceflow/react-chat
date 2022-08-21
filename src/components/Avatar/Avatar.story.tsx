import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar from '.';

export default {
  title: 'Core/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  image: 'https://source.unsplash.com/random/26x26',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  image: 'https://source.unsplash.com/random/72x72',
};
