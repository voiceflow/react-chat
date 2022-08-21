import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image from '.';

export default {
  title: 'Core/Image',
  component: Image,
  args: {
    image: 'https://source.unsplash.com/random/248x200',
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const RoundCorners = Template.bind({});

export const StraightCorners = Template.bind({});
StraightCorners.args = {
  rounded: false,
};
