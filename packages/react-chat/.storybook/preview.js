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
    multipleThemesStitches: {
      values: [{ name: 'light', theme }],
      default: 'light',
    },
  },
};

export default preview;
