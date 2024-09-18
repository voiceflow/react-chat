import type { Meta, StoryObj } from '@storybook/react';

import TypingIndicator from '.';

type Story = StoryObj<typeof TypingIndicator>;
const meta: Meta<typeof TypingIndicator> = {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default: Story = {};
