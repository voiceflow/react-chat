import type { Meta, StoryObj } from '@storybook/react';

import * as SVGs from '@/assets/svg';

import Icon from '.';

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
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
};

export default meta;
export const Default: Story = {
  args: {
    svg: 'close',
    css: {
      height: 50,
      width: 50,
    },
  },
};
