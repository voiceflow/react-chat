import { style } from '@vanilla-extract/css';

import { colorThemeVars, themeVars } from '@/styles/new-theme.css';

export const resetStyle = style({
  border: 0,
  padding: 0,
  ':focus': {
    outline: 0,
  },
  ':hover': {
    cursor: 'pointer',
  },
});

export const containerStyle = style([
  resetStyle,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 14px',
    borderRadius: themeVars.radius.sm,
    fontWeight: themeVars.font.weights.heavy,
    whiteSpace: 'nowrap',
    overflowWrap: 'anywhere',
  },
]);

export const secondaryButtonStyles = style([
  containerStyle,
  {
    height: themeVars.sizes.sm,
    // border: '1px solid $fadedPrimary', // parameterize
    border: `1px solid ${colorThemeVars.colors.primary}`, // fix this
    color: colorThemeVars.colors.primary,
    backgroundColor: '#fff', // parameterize
    // boxShadow: '0 1px 2px $shadow2',
    transition: 'border-color 150ms ease', // parameterize
    ':hover': {
      borderColor: colorThemeVars.colors.primary,
    },
  },
]);
