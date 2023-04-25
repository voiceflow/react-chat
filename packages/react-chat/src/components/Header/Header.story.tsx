import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';
import { VF_ICON } from '@/fixtures';

import Header from '.';

export default {
  title: 'Components/Chat/Header',
  component: Header,
  args: {
    title: 'Assistant Name',
    image: VF_ICON,
    actions: [],
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
