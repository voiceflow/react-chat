import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from '.';

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card Header',
    image: '',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa et aliquam sunt necessitatibus molestiae amet ipsum ut.',
    actions: [],
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Simple = Template.bind({});

export const WithImage = Template.bind({});
WithImage.args = {
  image: 'https://source.unsplash.com/featured/248x150',
};

export const Actionable = Template.bind({});
Actionable.args = {
  ...WithImage.args,
  actions: [
    { request: {} as any, name: 'First Button' },
    { request: {} as any, name: 'Second Button' },
    { request: {} as any, name: 'Third Button' },
  ],
};
