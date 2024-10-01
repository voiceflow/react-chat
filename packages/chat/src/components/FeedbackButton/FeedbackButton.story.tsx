import type { Meta, StoryObj } from '@storybook/react';

import { RuntimeProvider } from '@/contexts';

import { FeedbackButton } from './FeedbackButton.component';

const MOCK_CONFIG = { render: { mode: 'embedded' }, verify: { projectID: ' ' } } as any;

const meta: Meta<typeof FeedbackButton> = {
  title: 'Button/FeedbackButton',
  component: FeedbackButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedbackButton>;

const THEME_FIXTURE = [
  '#A3E4D7',
  '#F1948A',
  '#85C1E9',
  '#F7DC6F',
  '#BB8FCE',
  '#F0B27A',
  '#58D68D',
  '#5DADE2',
  '#E59866',
  '#D98880',
  'blue',
  'red',
  'green',
  'yellow',
  'purple',
];

const VariantRenderer = ({ title, active }: { title: string; active?: boolean }) => {
  return (
    <>
      <h1>{title}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {THEME_FIXTURE.map((color, index) => (
          <RuntimeProvider config={MOCK_CONFIG} assistant={{ persistence: {}, extensions: [], color } as any}>
            <FeedbackButton
              variant={index % 2 === 0 ? 'up' : 'down'}
              active={active}
              key={index}
              onClick={() => null}
              testID={`feedback-button--${index}`}
            />
          </RuntimeProvider>
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
