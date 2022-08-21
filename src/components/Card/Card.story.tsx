import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from '.';

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card Header',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa et aliquam sunt necessitatibus molestiae amet ipsum ut.',
    image: 'https://source.unsplash.com/random/248x150',
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Simple = Template.bind({});

export const Actionable = Template.bind({});
Actionable.args = {
  actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
};
