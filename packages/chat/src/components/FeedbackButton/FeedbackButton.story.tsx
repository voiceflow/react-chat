import type { Meta, StoryObj } from '@storybook/react';

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
    <FeedbackButton
      onNegativeClick={() => null}
      onPositiveClick={() => null}
      variant={FeedbackButtonVariant.PREVIOUS_RESPONSE}
    />
  ),
};

export const LastResponse: Story = {
  render: () => (
    <FeedbackButton
      onNegativeClick={() => null}
      onPositiveClick={() => null}
      variant={FeedbackButtonVariant.LAST_RESPONSE}
    />
  ),
};
