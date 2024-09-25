import { createThemeContract } from '@vanilla-extract/css';

const PRIMARY_COLOR = '#3d82e2';
const FADED_PRIMARY = '#3b80e0';

export const colorThemeVars = createThemeContract({
  colors: {
    primary: PRIMARY_COLOR,
    darkPrimary: FADED_PRIMARY,
    fadedPrimary: FADED_PRIMARY,
  },
});

export const newTheme = {
  ...colorThemeVars,
  font: {
    weights: {
      light: '400',
      heavy: '600',
    },
  },
  sizes: {
    xxs: '16px',
    xs: '24px',
    sm: '36px',
    md: '42px',
    lg: '56px',
    xl: '60px',
    xxl: '72px',
  },
  radius: {
    sm: '8px',
    lg: '10px',
    round: '50%',
  },
};

export const themeVars = createThemeContract(newTheme);
