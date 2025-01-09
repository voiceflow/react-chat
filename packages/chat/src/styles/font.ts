import type { ComplexStyleRule } from '@vanilla-extract/css';

import { defaultFontFace } from './font.css';

export const FAMILY = `'${defaultFontFace}', 'Open Sans', 'Arial', 'sans-serif'`;

export const hideTextOverflow = () => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const lineClamp = (lines: number) =>
  ({
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }) as ComplexStyleRule;
