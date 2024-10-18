import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const stopButton = style({
  borderRadius: '100%',
  outline: 'none',
  border: 'none',
  height: '32px',
  width: '32px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 'none',
  backgroundColor: COLORS.NEUTRAL_DARK[90012],
  color: COLORS.NEUTRAL_DARK[800],
});

export const icon = style({
  width: '24px',
  height: '24px',
});
