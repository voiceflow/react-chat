import chroma from 'chroma-js';

const PRIMARY = '#3d82e2';
const WARN = '#db1b42';

export const SHADOWS = {
  shadow1: 'rgba(0,0,0,0.01)',
  shadow2: 'rgba(0,0,0,0.02)',
  shadow3: 'rgba(0,0,0,0.03)',
  shadow4: 'rgba(0,0,0,0.04)',
  shadow6: 'rgba(0,0,0,0.06)',
  shadow8: 'rgba(0,0,0,0.08)',
  shadow12: 'rgba(0,0,0,0.12)',
  shadow16: 'rgba(0,0,0,0.16)',
};

export const PALETTE = {
  black: 'rgba(0,0,0,0.9)',
  white: '#fff',
  lightGrey: '#f4f4f4',
  medGrey: '#dfdfdf',
  darkGrey: '#737376',
  primary: PRIMARY,
  darkPrimary: chroma(PRIMARY).darken(0.25).hex(),
  warn: WARN,
  darkWarn: chroma(WARN).darken(0.25).hex(),

  ...SHADOWS,
};
