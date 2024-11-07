import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { COLOR_FIXTURE } from '@/__fixtures__/colors';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { FeedbackButton } from '.';

const meta: Meta<typeof FeedbackButton> = {
  title: 'Button/FeedbackButton',
  component: FeedbackButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedbackButton>;

const VariantRenderer = ({ active }: { active?: boolean }) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {COLOR_FIXTURE.map((color, index) => (
          <div style={assignInlineVars(PALETTE, { colors: createPalette(color) })}>
            <FeedbackButton
              variant={index % 2 === 0 ? 'up' : 'down'}
              active={active}
              key={index}
              onClick={() => null}
              testID={`feedback-button--${index}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export const Base: Story = {
  render: () => <FeedbackButton onClick={() => null} />,
};
export const Variants: Story = {
  render: () => <VariantRenderer />,
};

export const ActiveExamples: Story = {
  render: () => <VariantRenderer active={true} />,
};
