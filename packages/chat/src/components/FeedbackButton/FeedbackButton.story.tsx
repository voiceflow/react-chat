import type { Meta, StoryObj } from '@storybook/react';

import { RuntimeProvider } from '@/contexts';

import { FeedbackButton } from './FeedbackButton.component';

const MOCK_CONFIG = { render: { mode: 'embedded' }, verify: { projectID: ' ' } } as any;
const MOCK_ASSISTANT = { persistence: {}, extensions: [], color: 'red' } as any;

const meta: Meta<typeof FeedbackButton> = {
  title: 'Button/FeedbackButton',
  component: FeedbackButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedbackButton>;

export const Base: Story = {
  decorators: [
    (Story) => (
      <RuntimeProvider config={MOCK_CONFIG} assistant={MOCK_ASSISTANT}>
        <Story />
      </RuntimeProvider>
    ),
  ],
};

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
];

const ActiveExampleComponent = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {THEME_FIXTURE.map((color, index) => (
          <RuntimeProvider config={MOCK_CONFIG} assistant={{ persistence: {}, extensions: [], color } as any}>
            <FeedbackButton key={index} onClick={() => null} testID={`chip-${index}`} />
          </RuntimeProvider>
        ))}
      </div>
    </>
  );
};

export const ActiveExamples = {
  render: () => <ActiveExampleComponent />,
};
