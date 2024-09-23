import { style } from '@vanilla-extract/css';

import { newTheme } from '@/styles/new-theme.css';

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
    borderRadius: newTheme.radius.sm,
    fontWeight: newTheme.font.weights.heavy,
    whiteSpace: 'nowrap',
    overflowWrap: 'anywhere',
  },
]);
export const secondaryButtonStyles = style([
  containerStyle,
  {
    height: newTheme.sizes.sm,
    // border: '1px solid $fadedPrimary', // parameterize
    border: `1px solid ${newTheme.colors.primary}`, // fix this
    color: newTheme.colors.primary,
    backgroundColor: '#fff', // parameterize
    // boxShadow: '0 1px 2px $shadow2',
    transition: 'border-color 150ms ease', // parameterize
    ':hover': {
      borderColor: newTheme.colors.primary,
    },
  },
]);
