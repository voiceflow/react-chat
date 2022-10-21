import { ComponentMeta, ComponentStory } from '@storybook/react';

import Bubble from '.';

export default {
  title: 'Core/Bubble',
  component: Bubble,
  args: {
    color: '#fff',
  },
} as ComponentMeta<typeof Bubble>;

const Template: ComponentStory<typeof Bubble> = (args) => <Bubble {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  svg: 'arrowUp',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  svg: 'launch',
};
