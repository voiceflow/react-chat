import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const welcomeMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px 20px 24px 20px',
});

export const avatarContainer = style({
  marginBottom: 16,
});

export const welcomeMessageTitle = style({
  // fontFamily: FAMILY
  margin: '0 0 4px 0',
  fontSize: '22px',
  color: COLORS.NEUTRAL_DARK[900],
});

export const welcomeMessageDescription = style({
  margin: 0,
  fontSize: '14px',
  color: COLORS.NEUTRAL_DARK[100],
});
