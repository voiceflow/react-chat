import React from 'react';
import { theme } from '../src/styles/theme';

const preview = {
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
      <>
        <section style={{background: 'red'}}>DECORATOR from preview.tsx</section>
        <Story />
      </>
    ),
  ],
};

export default preview;
