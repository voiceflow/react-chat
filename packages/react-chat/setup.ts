/* eslint-disable import/no-mutable-exports */
import type { CSS as BaseCSS } from '@voiceflow/stitches-react';
import { createStitches } from '@voiceflow/stitches-react';

console.log('>>> LOADED File: ./SETUP.ts');

export const createTransition = (properties: Array<keyof any>, duration = ANIMATION_DURATION) =>
  properties.map((property) => `${String(property)} ${duration}ms ease`).join(', ');

export type CSS = BaseCSS<any>;

type Token<T extends Record<string, any>> = `$${any}`;

export interface FontOptions {
  size?: BaseCSS['fontSize'] | Token<any>;
  weight?: BaseCSS['fontWeight'] | Token<any>;
  height?: BaseCSS['lineHeight'] | Token<any>;
}

export let styled: any = null!;
export let keyframes: any = null!;
export let global: any = null!;
export let config: any = null!;
export let theme: any = null!;
export let createTheme: any = null!;

const ANIMATION_DURATION = 150;

export const getDefaultTheme = (root: ShadowRoot) => {
  return {
    ...(__USE_SHADOW_ROOT__ && { root }),

    theme: {
      colors: {},
      shadows: {},

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
        default: 'sans-serif',
      },
      fontSizes: { sm: '12px', md: '14px', lg: '16px', xl: '18px', xxl: '20px', xxxl: '24px' },
      fontWeights: { regular: 400, medium: 500, bold: 700 },
      lineHeights: { sm: '16px', md: '20px', lg: '24px', xl: '28px', xxl: '32px', xxxl: '36px' },

      radii: {
        1: '8px',
        2: '10px',
        round: '50%',
      },
    },

    media: {
      mobile: '(max-width: 768px)',
    },

    utils: {
      anim: (animations: { (): string }[]) => ({
        animation: animations.map((animation) => `${animation} ${ANIMATION_DURATION}ms`).join(', '),
      }),

      trans: (properties: Array<any>) => ({
        transition: properties.map((property) => `${property} ${ANIMATION_DURATION}ms`).join(', '),
      }),
    },
  };
};

export const initStitches = (root: any) => {
  console.log('initStitches');
  const stitches = createStitches(getDefaultTheme(root));
  // @ts-ignore
  styled = stitches.styled;
  keyframes = stitches.keyframes;
  global = stitches.global;
  config = stitches.config;
  theme = stitches.theme;
  createTheme = stitches.createTheme;
};

interface ThemeOverrides {
  color?: string | undefined;
}
export const createCustomTheme = ({ color }: ThemeOverrides) =>
  createTheme({
    colors: color ? Color.createPrimaryColors(color) : {},
  });
