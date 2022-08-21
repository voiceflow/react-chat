import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from '.';

export default {
  title: 'Core/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  svg: 'launch',
  css: {
    color: 'pink',
    height: 50,
    width: 50,
  },
};
