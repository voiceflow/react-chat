import type { Preview } from '@storybook/react';
import React from 'react';

import { RuntimeProvider } from '../src/contexts/RuntimeContext/index';

const MOCK_CONFIG = { render: { mode: 'embedded' }, verify: { projectID: ' ' } } as any;
const MOCK_ASSISTANT = { persistence: {}, extensions: [] } as any;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <RuntimeProvider config={MOCK_CONFIG} assistant={MOCK_ASSISTANT}>
        <Story />
      </RuntimeProvider>
    ),
  ],
};

export default preview;
