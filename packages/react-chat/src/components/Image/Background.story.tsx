import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image from '.';

export default {
  title: 'Core/Image/Background',
  component: Image.Background,
  args: {
    image: 'https://source.unsplash.com/featured/248x200',
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image.Background> = (args) => <Image.Background {...args} />;

export const Default = Template.bind({});
