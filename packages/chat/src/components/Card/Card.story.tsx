import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_IMAGE } from '@/fixtures';

import Card from '.';

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card Header',
    image: '',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa et aliquam sunt necessitatibus molestiae amet ipsum ut.',
    actions: [],
  },
};
export default meta;

export const Simple: Story = {};

export const WithImage: Story = {
  args: {
    image: MOCK_IMAGE,
  },
};

export const Actionable: Story = {
  args: {
    ...WithImage.args,
    actions: [
      { request: {} as any, name: 'First Button' },
      { request: {} as any, name: 'Second Button' },
      { request: {} as any, name: 'Third Button' },
    ],
  },
};

export const WithLongLabels: Story = {
  args: {
    ...WithImage.args,
    actions: [
      { request: {} as any, name: 'First Button with a very long long long wrapping label' },
      { request: {} as any, name: 'Second Button with a shorter text' },
      { request: {} as any, name: 'Third button, also with a shorter text' },
    ],
  },
};

export const WithLongTitle: Story = {
  args: {
    ...WithImage.args,
    title: 'Long card title to wrap inside the card. Some more text to test the growth of card.',
    actions: [{ request: {} as any, name: 'First Button' }],
  },
};
