import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_FIXTURE } from '@/__fixtures__/colors';

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
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      {COLOR_FIXTURE.map((color, index) => (
        <FeedbackButton
          primaryColor={color}
          variant={index % 2 === 0 ? 'up' : 'down'}
          active={active}
          key={index}
          onClick={() => null}
          testID={`feedback-button--${index}`}
        />
      ))}
    </div>
  );
};

export const Base: Story = {
  render: () => <VariantRenderer />,
};

export const ActiveExamples: Story = {
  render: () => <VariantRenderer active={true} />,
};
