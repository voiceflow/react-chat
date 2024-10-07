import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const messageContainer = style({
  backgroundColor: COLORS.ACCENT[500],
  color: COLORS.ACCENT[50],
  padding: '11px 16px 10px',
  fontFamily: FAMILY,
  position: 'relative',
  fontSize: '14px',
  lineHeight: '20px',
  borderRadius: '10px',
});
