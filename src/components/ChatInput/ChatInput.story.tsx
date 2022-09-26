import { ComponentMeta, ComponentStory } from '@storybook/react';

import ChatInput from '.';

export default {
  title: 'Components/Chat/ChatInput',
  component: ChatInput,
  parameters: { actions: { argTypesRegex: '^on(?:Click|Blur)' } },
} as ComponentMeta<typeof ChatInput>;

const Template: ComponentStory<typeof ChatInput> = (args) => <ChatInput.Controlled {...args} />;

export const Default = Template.bind({});

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Message…',
};
