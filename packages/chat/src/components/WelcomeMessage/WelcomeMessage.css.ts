import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const welcomeMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: FAMILY,
  padding: '48px 20px 44px 20px',
  textAlign: 'center',
});

export const avatarContainer = style({
  marginBottom: '16px',
});

export const welcomeMessageTitle = style({
  marginBottom: '4px',
  fontSize: '22px',
  fontWeight: 700,
  color: COLORS.NEUTRAL_DARK[900],
});

export const welcomeMessageDescription = style({
  margin: 0,
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.NEUTRAL_DARK[100],
});
