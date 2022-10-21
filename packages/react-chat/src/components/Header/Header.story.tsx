import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import Header from '.';

export default {
  title: 'Components/Chat/Header',
  component: Header,
  args: {
    title: 'Assistant Name',
    image: 'https://source.unsplash.com/random/32x32',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Chat.Container>
    <Header {...args} />
  </Chat.Container>
);

export const Simple = Template.bind({});

export const Actionable = Template.bind({});
Actionable.args = {
  actions: [{ svg: 'minus' }, { svg: 'close' }],
};
