import { createThemeContract } from '@vanilla-extract/css';

import { createPalette } from './colors';

export const PALETTE = createThemeContract({
  colors: createPalette(),
});
