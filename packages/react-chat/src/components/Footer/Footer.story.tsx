import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import Footer from '.';

export default {
  title: 'Components/Chat/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => (
  <Chat.Container>
    <Footer {...args} />
  </Chat.Container>
);

export const Running = Template.bind({});

export const Ended = Template.bind({});
Ended.args = {
  hasEnded: true,
};
