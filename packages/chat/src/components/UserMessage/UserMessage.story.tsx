import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { WithDefaultPalette } from '@/storybook/decorators';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { UserMessage } from './index';

type Story = StoryObj<typeof UserMessage>;

const shortMessage = 'Howdy folks how yall doing out there?';
const meta: Meta<typeof UserMessage> = {
  title: 'Core/UserMessage',
  component: UserMessage,
  decorators: [WithDefaultPalette],
};
export default meta;

export const Short: Story = {
  args: {
    message: shortMessage,
  },
};

export const Long: Story = {
  args: {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget diam neque.',
  },
};

export const Green: Story = {
  args: {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget diam neque.',
  },
  decorators: [
    (Story: any) => (
      <div style={assignInlineVars(PALETTE, { colors: createPalette('green') })}>
        <Story />
      </div>
    ),
  ],
};
