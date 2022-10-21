import { ComponentMeta, ComponentStory } from '@storybook/react';

import TypingIndicator from '.';

export default {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
} as ComponentMeta<typeof TypingIndicator>;

const Template: ComponentStory<typeof TypingIndicator> = (args) => <TypingIndicator {...args} />;

export const Default = Template.bind({});
