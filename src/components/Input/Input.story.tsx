import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '.';

export default {
  title: 'Core/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input.Controlled {...args} />;

export const Default = Template.bind({});

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Message…',
};
