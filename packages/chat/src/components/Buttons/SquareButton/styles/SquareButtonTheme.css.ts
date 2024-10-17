import { createTheme } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const [light, contract] = createTheme({
  color: {
    default: COLORS.NEUTRAL_DARK[100],
    hover: COLORS.NEUTRAL_DARK[600],
    active: COLORS.NEUTRAL_DARK[800],
    disabled: COLORS.NEUTRAL_LIGHT[600],
  },
  backgroundColor: {
    hover: COLORS.NEUTRAL_DARK[900_6],
    active: COLORS.NEUTRAL_DARK[900_12],
    disabled: COLORS.white[100],
  },
});

export const dark = createTheme(contract, {
  color: {
    default: COLORS.NEUTRAL_LIGHT[600],
    hover: COLORS.NEUTRAL_LIGHT[300],
    active: COLORS.NEUTRAL_LIGHT[50],
    disabled: COLORS.NEUTRAL_DARK[200],
  },
  backgroundColor: {
    hover: COLORS.NEUTRAL_DARK[400],
    active: COLORS.NEUTRAL_DARK[200],
    disabled: COLORS.NEUTRAL_DARK[600],
  },
});
