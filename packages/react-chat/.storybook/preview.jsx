import React from 'react';

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
        <section style={{ background: 'red', height: '100px' }}>DECORATOR from preview.tsx</section>
        <Story />
      </>
    ),
  ],
};

export default preview;
