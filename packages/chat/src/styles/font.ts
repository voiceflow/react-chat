import type { ComplexStyleRule } from '@vanilla-extract/css';

export const FAMILY = "'UCityProWeb', 'Open Sans', 'Arial', 'sans-serif'";

export const lineClamp = (lines: number) =>
  ({
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }) as ComplexStyleRule;
