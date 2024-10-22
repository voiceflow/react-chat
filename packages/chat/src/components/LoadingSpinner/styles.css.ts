import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

const spinnerScaleAnimation = keyframes({
  '0%': {
    transform: 'scale(0.4, 0.4) rotate(0)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(1.4, 1.4) rotate(0)',
    opacity: 1,
  },
});

const spinnerAnimation = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const fadeAnimation = keyframes({
  '0%': {
    opacity: '0',
  },
  '100%': {
    opacity: '1',
  },
});

export const spinnerStyle = style({
  height: '16px',
  animation: `${spinnerScaleAnimation} .75s linear forwards, ${spinnerAnimation} 1.25s linear forwards`,
});

const RECT_ANIMATION_PROPERTIES = [
  {
    opacity: '1.12',
    animationDelay: '-0.96s',
  },
  {
    opacity: '1',
    animationDelay: '-0.84s',
  },
  {
    opacity: '0.88',
    animationDelay: '-0.72s',
  },
  {
    opacity: '0.76',
    animationDelay: '-0.6s',
  },
  {
    opacity: '0.64',
    animationDelay: '-0.48s',
  },
  {
    opacity: '0.52',
    animationDelay: '-0.36s',
  },
  {
    opacity: '0.4',
    animationDelay: '-0.24s',
  },
  {
    opacity: '0.28',
    animationDelay: '-0.12s',
  },
  {
    opacity: '0.16',
    animationDelay: '0s',
  },
];

const produceSpinnerAnimationSelectors = () => {
  return RECT_ANIMATION_PROPERTIES.reduce((accum, element, index) => {
    return {
      ...accum,
      [`${spinnerStyle} &:nth-child(${index + 1})`]: {
        animation: `${fadeAnimation} 1s linear infinite`,
        animationDelay: element.animationDelay,
        opacity: element.opacity,
      },
    };
  }, {});
};

export const rectStyles = style({
  selectors: produceSpinnerAnimationSelectors(),
});

export const spinnerSizeVariants = styleVariants({
  large: {
    height: '24px',
    width: 'auto',
  },
  medium: {
    height: '16px',
    width: 'auto',
  },
});

export const spinnerThemeVariants = styleVariants({
  light: {
    color: COLORS.white,
  },
  dark: {
    color: COLORS.NEUTRAL_DARK[900],
  },
});

export const spinnerRecipe = recipe({
  variants: {
    size: spinnerSizeVariants,
    variant: spinnerThemeVariants,
  },
});
