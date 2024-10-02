import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_FIXTURE } from '@/__fixtures__/colors';

import { FeedbackButton } from './FeedbackButton.component';

const meta: Meta<typeof FeedbackButton> = {
  title: 'Button/FeedbackButton',
  component: FeedbackButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedbackButton>;

const VariantRenderer = ({ title, active }: { title: string; active?: boolean }) => {
  return (
    <>
      <h1>{title}</h1>
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
    </>
  );
};

export const Base: Story = {
  render: () => <VariantRenderer title="Base" />,
};

export const ActiveExamples: Story = {
  render: () => <VariantRenderer title="Active state" active={true} />,
};
