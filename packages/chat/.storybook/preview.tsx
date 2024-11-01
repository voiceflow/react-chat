import 'regenerator-runtime/runtime';
import './assets/fonts/fonts.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
        fontFamily: 'sans-serif',
      },
    },
  },
};

export default preview;
