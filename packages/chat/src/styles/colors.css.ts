import { createThemeContract } from '@vanilla-extract/css';

import { createPalette } from './colors';
import { FAMILY } from './font';

export const THEME = createThemeContract({
  colors: createPalette(),
  fontFamily: FAMILY,
});
