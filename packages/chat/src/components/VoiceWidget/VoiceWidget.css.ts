import { style } from '@vanilla-extract/css';

import { SHADOWS } from '@/styles/box-shadows';
import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const voiceWidgetContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 20px',
  background: 'white',
  borderRadius: '16px',
  boxShadow: SHADOWS.Z64_Light,
  overflow: 'hidden',
  width: 'fit-content',
  position: 'relative',
  zIndex: 1,
  userSelect: 'none',
  gap: '16px',
});

export const controlSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  boxSizing: 'border-box',
});

export const titleStyle = style({
  fontFamily: FAMILY,
  fontSize: '14px',
  fontWeight: 400,

  lineHeight: '20px',
  color: COLORS.NEUTRAL_DARK[900],
  textAlign: 'center',
});
