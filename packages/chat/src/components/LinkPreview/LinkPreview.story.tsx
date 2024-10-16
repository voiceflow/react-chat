import type { Meta, StoryObj } from '@storybook/react';

import tiledBg from '../../__fixtures__/tiled-bg.png';
import LinkPreview from '.';
type Story = StoryObj<typeof LinkPreview>;

const meta: Meta<typeof LinkPreview> = {
  title: 'Components/LinkPreview',
  component: LinkPreview,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default: Story = {
  args: {
    image: tiledBg,
    title:
      'Lorem ipsum dolor sit amet consectetur. Quis risus nibh tincidunt platea. A donec amet gravida aliquam sed eget aliquet sollicitudin turpis.',
    url: 'websiteexample.com',
  },
};

export const Loading: Story = {
  args: {
    title:
      'Lorem ipsum dolor sit amet consectetur. Quis risus nibh tincidunt platea. A donec amet gravida aliquam sed eget aliquet sollicitudin turpis.',
    url: 'websiteexample.com',
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    image: tiledBg,
    title:
      'Lorem ipsum dolor sit amet consectetur. Quis risus nibh tincidunt platea. A donec amet gravida aliquam sed eget aliquet sollicitudin turpis.',
    url: 'websiteexample.com',
  },
};

export const LoadingInline: Story = {
  args: {
    inline: true,
    title:
      'Lorem ipsum dolor sit amet consectetur. Quis risus nibh tincidunt platea. A donec amet gravida aliquam sed eget aliquet sollicitudin turpis.',
    url: 'websiteexample.com',
  },
};
