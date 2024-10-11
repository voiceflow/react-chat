import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const copyButton = style({
  position: 'absolute',
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: COLORS.NEUTRAL_LIGHT[300],
  backgroundColor: COLORS.NEUTRAL_DARK[400],
  right: 12,
  top: 12,
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  zIndex: 2,
});
