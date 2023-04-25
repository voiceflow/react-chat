import { ComponentMeta, ComponentStory } from '@storybook/react';

import TypingIndicator from '.';

export default {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as ComponentMeta<typeof TypingIndicator>;

const Template: ComponentStory<typeof TypingIndicator> = (args) => <TypingIndicator {...args} />;

export const Default = Template.bind({});
