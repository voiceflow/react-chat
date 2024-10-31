import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';

export const copyButton = style({
  width: 36,
  height: 36,
  borderRadius: SIZES.radius.xs,
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
