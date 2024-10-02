import { style } from '@vanilla-extract/css';

import { FAMILY } from '@/old-styles/font';

export const messageContainer = style({
  backgroundColor: '#F1F2F2',
  color: '#1A1E23',
  padding: '11px 16px 10px',
  fontFamily: FAMILY,
  fontSize: '14px',
  lineHeight: '20px',
  borderRadius: '10px',
});
