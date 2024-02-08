/* eslint-disable import/no-mutable-exports */

import type { CSS as BaseCSS } from '@voiceflow/stitches-react';
import { createStitches } from '@voiceflow/stitches-react';
import Stitches from '@voiceflow/stitches-react/types/stitches';
import type { PropertiesHyphen as CSSPropertiesHyphen } from 'csstype';
import type { StringKeyOf } from 'type-fest';

import * as Color from './color';
import * as Font from './font';
console.log('>>> LOADED File: packages/react-chat/src/styles/theme.ts');
const ANIMATION_DURATION = 150;

export const createTransition = (properties: Array<keyof CSSPropertiesHyphen>, duration = ANIMATION_DURATION) =>
  properties.map((property) => `${property} ${duration}ms ease`).join(', ');

export type CSS = BaseCSS<typeof config>;

type Token<T extends Record<string, any>> = `$${StringKeyOf<T>}`;

export interface FontOptions {
  size?: BaseCSS['fontSize'] | Token<typeof Font['SIZES']>;
  weight?: BaseCSS['fontWeight'] | Token<typeof Font['WEIGHTS']>;
  height?: BaseCSS['lineHeight'] | Token<typeof Font['LINE_HEIGHTS']>;
}

type CustomStitches = Stitches<'', Record<string, never>>;

// export const getDefaultTheme = (root: ShadowRoot) => {
//   return {
//     ...(__USE_SHADOW_ROOT__ && { root }),

//     theme: {
//       colors: Color.PALETTE,
//       shadows: Color.SHADOWS,

//       space: {
//         1: '4px',
//         2: '6px',
//         3: '12px',
//         4: '16px',
//         5: '20px',
//         6: '24px',
//       },
//       sizes: {
//         xxs: '16px',
//         xs: '24px',
//         sm: '36px',
//         md: '42px',
//         lg: '56px',
//         xl: '60px',
//         xxl: '72px',
//       },

//       fonts: {
//         default: Font.FAMILY,
//       },
//       fontSizes: Font.SIZES,
//       fontWeights: Font.WEIGHTS,
//       lineHeights: Font.LINE_HEIGHTS,

//       radii: {
//         1: '8px',
//         2: '10px',
//         round: '50%',
//       },
//     },

//     media: {
//       mobile: '(max-width: 768px)',
//     },

//     utils: {
//       anim: (animations: { (): string }[]) => ({
//         animation: animations.map((animation) => `${animation} ${ANIMATION_DURATION}ms`).join(', '),
//       }),

//       trans: (properties: Array<keyof CSSPropertiesHyphen>) => ({
//         transition: createTransition(properties),
//       }),

//       typo: ({ size = Font.SIZES[2], weight = Font.WEIGHTS[1], height = Font.LINE_HEIGHTS[1] }: FontOptions) => ({
//         fontFamily: '$default',
//         fontSize: size,
//         fontWeight: weight,
//         lineHeight: height,
//       }),
//     },
//   };
// };

// export let styled: CustomStitches['styled'] = null!;
// export let keyframes: CustomStitches['keyframes'] = null!;
// export let global: CustomStitches['global'] = null!;
// export let config: CustomStitches['config'] = null!;
// export let theme: CustomStitches['theme'] = null!;
// export let createTheme: CustomStitches['createTheme'] = null!;

// export const initStitches = (root: any) => {
//   console.log('initStitches');
//   const stitches = createStitches(getDefaultTheme(root));

//   styled = stitches.styled;
//   keyframes = stitches.keyframes;
//   global = stitches.global;
//   config = stitches.config;
//   theme = stitches.theme;
//   createTheme = stitches.createTheme;
// };

interface ThemeOverrides {
  color?: string | undefined;
}
export const createCustomTheme = ({ color }: ThemeOverrides) =>
  createTheme({
    colors: color ? Color.createPrimaryColors(color) : {},
  });
