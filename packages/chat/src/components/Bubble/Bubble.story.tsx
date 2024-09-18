import type { Meta, StoryObj } from '@storybook/react';

import * as SVGs from '@/assets/svg';

import Bubble from '.';

type Story = StoryObj<typeof Bubble>;

const meta: Meta<typeof Bubble> = {
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
};
export default meta;

export const Small: Story = {
  args: {
    size: 'small',
    svg: 'smallArrowUp',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    svg: 'close',
  },
};
