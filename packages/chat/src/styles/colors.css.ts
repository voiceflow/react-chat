import { createThemeContract } from '@vanilla-extract/css';

import { createColorPalette } from './colors';

export const PALETTE = createThemeContract({
  colors: createColorPalette(),
});
