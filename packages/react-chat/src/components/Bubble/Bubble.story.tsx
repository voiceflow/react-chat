import { ComponentMeta, ComponentStory } from '@storybook/react';

import * as SVGs from '@/assets/svg';

import Bubble from '.';

export default {
  title: 'Core/Bubble',
  component: Bubble,
  args: {
    color: '#fff',
  },
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
      defaultValue: 'large',
    },
    svg: {
      options: Object.keys(SVGs).filter((svg) => svg !== 'topCaret'),
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Bubble>;

const Template: ComponentStory<typeof Bubble> = (args) => <Bubble {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  svg: 'smallArrowUp',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  svg: 'close',
};
