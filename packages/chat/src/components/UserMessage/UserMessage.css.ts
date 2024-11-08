import { createVar, style } from '@vanilla-extract/css';

import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

export const background = createVar();

export const messageContainer = style({
  backgroundColor: PALETTE.colors[500],
  color: PALETTE.colors[50],
  padding: '11px 16px 10px',
  marginBottom: 4,
  marginTop: 12,
  fontFamily: FAMILY,
  position: 'relative',
  fontSize: '14px',
  lineHeight: '20px',
  justifySelf: 'flex-end',
  width: 'fit-content',
  borderRadius: SIZES.radius.sm,
});
