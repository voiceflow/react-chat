import { ComponentMeta, ComponentStory } from '@storybook/react';

import ChatWidget from '.';

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

const Template: ComponentStory<typeof ChatWidget> = (args) => <ChatWidget {...args} />;

export const Default = Template.bind({});
Default.args = {};
