import { ComponentMeta, ComponentStory } from '@storybook/react';

import { styled } from '@/styles';

import ChatWidget from './Chat';

const TemplateWrapper = styled('div', {
  [`${ChatWidget.Container}`]: {
    right: 30,
    bottom: 30,
  },
});

export default {
  title: 'Views/ChatWidget',
  component: ChatWidget,
  args: {
    projectID: '',
    assistant: {
      name: 'Assistant Name',
      image: 'https://source.unsplash.com/random/72x72',
      description: "Voiceflow's virtual assistant is here to help.",
    },
    color: '',
  },
} as ComponentMeta<typeof ChatWidget>;

const Template: ComponentStory<typeof ChatWidget> = (args) => (
  <TemplateWrapper>
    <ChatWidget {...args} />
  </TemplateWrapper>
);

export const Default = Template.bind({});
Default.args = {};
