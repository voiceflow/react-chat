import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image from '.';

export default {
  title: 'Core/Image',
  component: Image,
  args: {
    image: 'https://source.unsplash.com/featured/248x200',
    isRounded: true,
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const RoundCorners = Template.bind({});

export const StraightCorners = Template.bind({});
StraightCorners.args = {
  isRounded: false,
};
