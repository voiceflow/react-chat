import { createStitches, CSS as BaseCSS } from '@stitches/react';

export type CSS = BaseCSS<typeof config>;

const shadows = {
  shadow2: 'rgba(0,0,0,0.02)',
  shadow4: 'rgba(0,0,0,0.04)',
  shadow6: 'rgba(0,0,0,0.06)',
  shadow8: 'rgba(0,0,0,0.08)',
};

export const { styled, config } = createStitches({
  theme: {
    colors: {
      black: 'rgba(0,0,0,0.9)',
      white: '#fff',
      lightGrey: '#f4f4f4',
      darkGrey: '#737376',
      primary: '#3d82e2',
      warn: '#db1b42',

      ...shadows,
    },
    shadows,

    space: {
      1: '4px',
      2: '6px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
    },
    sizes: {
      xs: '16px',
      sm: '24px',
      md: '36px',
      lg: '42px',
      xl: '60px',
      xxl: '72px',
    },

    fonts: {
      default: "'Open Sans', sans-serif",
    },
    fontSizes: {
      1: '13px',
      2: '15px',
      3: '18px',
    },
    fontWeights: {
      1: 400,
      2: 600,
    },
    lineHeights: {
      1: '20px',
      2: '24px',
    },

    radii: {
      1: '8px',
      2: '10px',
      round: '50%',
    },
  },
});
