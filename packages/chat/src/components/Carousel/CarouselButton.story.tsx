import type { Meta, StoryObj } from '@storybook/react';

import { CarouselButton } from './CarouselButton';

type Story = StoryObj<typeof CarouselButton>;
const meta: Meta<typeof CarouselButton> = {
  title: 'Core/Carousel Button',
  component: CarouselButton,
  args: {
    visible: true,
  },
};

export default meta;

export const Right: Story = {
  args: {
    direction: 'right',
  },
};

export const Left: Story = {
  args: {
    direction: 'left',
  },
};
