import { ComponentMeta, ComponentStory } from '@storybook/react';

import * as SVGs from '@/assets/svg';

import Icon from '.';

export default {
  title: 'Core/Icon',
  component: Icon,
  argTypes: {
    svg: {
      options: Object.keys(SVGs).filter((svg) => svg !== 'topCaret'),
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: { include: ['svg'] },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  svg: 'close',
  css: {
    color: 'pink',
    height: 50,
    width: 50,
  },
};
