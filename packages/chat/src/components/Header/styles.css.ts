import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

import { buttonReset } from '../Button/reset.css';

export const headerContainer = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: PALETTE.colors[500],
  padding: '12px 16px 12px 20px',
  height: parseInt(SIZES.sm, 10) + 24, // Add the top and bottom padding
});

export const headerInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'space-between',
  minWidth: 0,
});

export const headerTitle = style({
  fontFamily: FAMILY,
  fontSize: 16,
  color: COLORS.white,
  fontWeight: 700,
  lineHeight: '23px',
  marginLeft: 12,
  minWidth: 0,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export const headerActions = style({
  display: 'flex',
  gap: '6px',
  flexShrink: 0,
  minWidth: 0,
});

export const headerActionButton = recipe({
  base: [
    buttonReset,
    {
      justifyContent: 'center',
      alignItems: 'center',
      width: 32,
      height: 32,
      borderRadius: SIZES.radius.xs,
      padding: 4,
      color: '#ffffffcc',
      backgroundColor: 'transparent',
      transition: transition(['color', 'background-color']),
      ':hover': {
        backgroundColor: '#ffffff29',
      },
      ':active': {
        backgroundColor: '#ffffff52',
      },
    },
  ],
});
