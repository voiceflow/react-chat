import { ComponentMeta, ComponentStory } from '@storybook/react';

import Carousel from '.';

const IMAGE = 'https://source.unsplash.com/random/248x150';

export default {
  title: 'Components/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const SingleCard = Template.bind({});
SingleCard.args = {
  cards: [
    {
      title: 'First Card',
      description: 'Lorem ipsum dolor sit amet',
      image: IMAGE,
      actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
    },
  ],
};

export const MultipleCards = Template.bind({});
MultipleCards.args = {
  cards: [
    {
      title: 'First Card',
      description: 'Lorem ipsum dolor sit amet',
      image: IMAGE,
      actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
    },
    {
      title: 'Second Card',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
      image: IMAGE,
    },
    {
      title: 'Third Card',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      image: IMAGE,
      actions: [{ label: 'Fourth Button' }, { label: 'Fifth Button' }],
    },
  ],
};
