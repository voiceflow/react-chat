import { ComponentMeta, ComponentStory } from '@storybook/react';

import Textarea from '.';

export default {
  title: 'Core/Textarea',
  component: Textarea,
  args: {
    value: 'Message text',
    onChange: () => null,
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  rows: 1,
};
