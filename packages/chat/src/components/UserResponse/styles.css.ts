import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';

export const messageContainer = style({
  backgroundColor: PALETTE.colors[500],
  color: PALETTE.colors[50],
  padding: '11px 16px 10px',
  fontFamily: FAMILY,
  position: 'relative',
  fontSize: '14px',
  lineHeight: '20px',
  justifySelf: 'flex-end',
  width: 'fit-content',
  borderRadius: SIZES.radius.sm,
  marginLeft: SMALL_AVATAR_SIZE + 12,
});

export const debugMessage = style({
  fontSize: '12px',
  lineHeight: '17px',
  color: COLORS.NEUTRAL_DARK[200],
  marginTop: SIZES.m,
});
