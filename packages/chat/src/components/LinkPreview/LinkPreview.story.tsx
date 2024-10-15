import type { Meta, StoryObj } from '@storybook/react';

import LinkPreview from '.';

type Story = StoryObj<typeof LinkPreview>;

const meta: Meta<typeof Launcher> = {
  title: 'Components/LinkPreview',
  component: LinkPreview,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default: Story = {
  args: {
    // eslint-disable-next-line no-secrets/no-secrets
    image: 'https://cm4-production-assets.s3.amazonaws.com/1668625107157-vf-nobg.png',
    title:
      'Lorem ipsum dolor sit amet consectetur. Quis risus nibh tincidunt platea. A donec amet gravida aliquam sed eget aliquet sollicitudin turpis.',
    url: 'websiteexample.com',
  },
};
