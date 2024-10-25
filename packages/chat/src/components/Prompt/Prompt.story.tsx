import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { Prompt } from '.';

type Story = StoryObj<typeof Prompt>;

const meta: Meta<typeof Prompt> = {
  title: 'Components/Chat/Prompt',
  component: Prompt,
  args: {
    cancel: { label: 'Cancel' },
  },
  render: (args) => (
    <>
      <div style={{ height: 250, backgroundColor: 'lavender' }} />
      <Prompt {...args} />
    </>
  ),
  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    visible: true,
    accept: { label: 'Primary Action' },
  },
};

export const Dangerous: Story = {
  args: {
    visible: true,
    accept: { label: 'Dangerous Action' },
  },
};
