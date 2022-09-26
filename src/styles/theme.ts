import { createStitches, CSS as BaseCSS } from '@stitches/react';
import { PropertiesHyphen as CSSPropertiesHyphen } from 'csstype';
import { StringKeyOf } from 'type-fest';

import * as Color from './color';
import * as Font from './font';

const ANIMATION_TIMING = '150ms';

export const createTransition = (property: keyof CSSPropertiesHyphen) => `${property} ${ANIMATION_TIMING} ease`;

export type CSS = BaseCSS<typeof config>;

type Token<T extends Record<string, any>> = `$${StringKeyOf<T>}`;

export interface FontOptions {
  size?: BaseCSS['fontSize'] | Token<typeof Font['SIZES']>;
  weight?: BaseCSS['fontWeight'] | Token<typeof Font['WEIGHTS']>;
  height?: BaseCSS['lineHeight'] | Token<typeof Font['LINE_HEIGHTS']>;
}

export const { styled, config, keyframes } = createStitches({
  theme: {
    colors: Color.PALETTE,
    shadows: Color.SHADOWS,

    space: {
      1: '4px',
      2: '6px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
    },
    sizes: {
      xxs: '16px',
      xs: '24px',
      sm: '36px',
      md: '42px',
      lg: '56px',
      xl: '60px',
      xxl: '72px',
    },

    fonts: {
      default: Font.FAMILY,
    },
    fontSizes: Font.SIZES,
    fontWeights: Font.WEIGHTS,
    lineHeights: Font.LINE_HEIGHTS,

    radii: {
      1: '8px',
      2: '10px',
      round: '50%',
    },
  },

  utils: {
    anim: (animations: { (): string }[]) => ({
      animation: animations.map((animation) => `${animation} ${ANIMATION_TIMING}`).join(', '),
    }),

    trans: (properties: Array<keyof CSSPropertiesHyphen>) => ({
      transition: properties.map(createTransition).join(', '),
    }),

    typo: ({ size = Font.SIZES[2], weight = Font.WEIGHTS[1], height = Font.LINE_HEIGHTS[1] }: FontOptions) => ({
      fontFamily: '$default',
      fontSize: size,
      fontWeight: weight,
      lineHeight: height,
    }),
  },
});
