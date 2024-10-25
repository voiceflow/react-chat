import type { Meta, StoryObj } from '@storybook/react';

import tiledBg from '../../__fixtures__/tiled-bg.png';
import { Card } from '.';

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Title',
    image: '',
    description: 'Description.',
    actions: [],
  },
};
export default meta;

export const Simple: Story = {};

export const OnlyTitle: Story = {
  args: {
    description: undefined,
  },
};

export const OnlyDescription: Story = {
  args: {
    title: undefined,
  },
};

export const WithImage: Story = {
  args: {
    image: tiledBg,
  },
};

export const Actionable: Story = {
  args: {
    ...WithImage.args,
    actions: [
      { request: {} as any, name: 'Label' },
      { request: {} as any, name: 'Label' },
      { request: {} as any, name: 'Label' },
    ],
  },
};

export const OnlyActions: Story = {
  args: {
    title: undefined,
    description: undefined,
    actions: [
      { request: {} as any, name: 'Label' },
      { request: {} as any, name: 'Label' },
      { request: {} as any, name: 'Label' },
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
