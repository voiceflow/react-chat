import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';

export const separatorContainer = style({
  height: 17,
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  padding: '4px 0',
});

export const line = style({
  backgroundColor: COLORS.NEUTRAL_LIGHT[50],
  height: 1,
  flexGrow: 1,
});

export const separatorText = style({
  backgroundColor: COLORS.white,
  color: COLORS.NEUTRAL_DARK[200],
  fontFamily: THEME.fontFamily,
  fontSize: '12px',
  lineHeight: '17px',
  fontWeight: 600,
  flexShrink: 0,
});
