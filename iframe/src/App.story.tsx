import { ComponentMeta, ComponentStory } from '@storybook/react';

import ChatWidget from '@/views/ChatWidget';

import App from './app';

export default {
  title: 'Views/App',
  component: ChatWidget,
  args: {
    verify: {
      projectID: '',
    },
    assistant: {
      color: '',
      title: 'Assistant Name',
      image: 'https://source.unsplash.com/random/72x72',
      description: "Voiceflow's virtual assistant is here to help.",
    },
  },
} as ComponentMeta<typeof ChatWidget>;

window.voiceflow = { config: { projectID: 'test' } } as any;

const Template: ComponentStory<typeof ChatWidget> = (args) => {
  return (
    <App {...args}>
      <ChatWidget {...args} />
    </App>
  );
};

export const Default = Template.bind({});
Default.args = {};
