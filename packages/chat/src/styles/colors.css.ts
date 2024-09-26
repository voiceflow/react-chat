import { createThemeContract } from '@vanilla-extract/css';

import { createColorPalette } from './colors';

const defaultPrimary = '#387dff';

export const PALETTE = createThemeContract({
  colors: createColorPalette(defaultPrimary),
});
