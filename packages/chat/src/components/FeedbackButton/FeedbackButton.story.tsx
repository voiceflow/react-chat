import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { FeedbackButton } from '.';
import { FeedbackButtonVariant } from './FeedbackButton.interface';

const meta: Meta<typeof FeedbackButton> = {
  title: 'Button/FeedbackButton',
  component: FeedbackButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedbackButton>;

export const PreviousResponse: Story = {
  render: () => (
    <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('green') }) }}>
      <FeedbackButton textContent="Howdy" onClick={() => null} variant={FeedbackButtonVariant.PREVIOUS_RESPONSE} />
    </div>
  ),
};

export const LastResponse: Story = {
  render: () => (
    <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('red') }) }}>
      <FeedbackButton textContent="Howdy" onClick={() => null} variant={FeedbackButtonVariant.LAST_RESPONSE} />
    </div>
  ),
};
