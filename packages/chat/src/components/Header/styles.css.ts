import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { FAMILY } from '@/old-styles/font';
import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { SIZES } from '@/styles/sizes';

import { buttonReset } from '../Button/reset.css';

export const headerContainer = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: PALETTE.colors[500],
  padding: '12px 16px 12px 20px',
});

export const headerInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'space-between',
});

export const headerTitle = style({
  fontFamily: FAMILY,
  fontSize: 16,
  color: COLORS.white,
  fontWeight: 700,
  lineHeight: '23px',
  marginLeft: 12,
});

export const headerActionButton = recipe({
  base: [
    buttonReset,
    {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 28,
      height: 28,
      borderRadius: SIZES.radius.xs,
      padding: 4,
      color: COLORS.white,
      backgroundColor: 'transparent',
      ':hover': {
        backgroundColor: '#ffffff29',
      },
      ':active': {
        backgroundColor: '#ffffff52',
      },
    },
  ],
});

export const headerActionIcon = style({
  display: 'flex',
  width: 24,
  height: 24,
});
