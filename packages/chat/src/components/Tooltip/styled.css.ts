import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

export const buttonStyle = style({
  height: SIZES.m,
  border: '1px solid #dfdfdf',
  borderTopColor: 'rgba(223,223,223,0.5)',
  borderRadius: SIZES.radius.xs,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  fontWeight: 600,
  color: PALETTE.colors[500],
  backgroundColor: '#fbfbfb',
});

export const withActionVariant = styleVariants({
  true: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export const containerStyle = recipe({
  base: {
    fontFamily: FAMILY,
    fontSize: '12px',
    display: 'inline-flex',
    flexDirection: 'column',
  },
  variants: {
    withActionVariant,
  },
});
