import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../styles.css';

const PRIMARY_BUTTON = buttonStyles.classNames.variants.type.primary;
const SECONDARY_BUTTON = buttonStyles.classNames.variants.type.secondary;

export const buttonIconStyles = style({
  transition: transition(['color']),
  selectors: {
    [`${PRIMARY_BUTTON} &`]: {
      color: COLORS.ACCENT[50],
    },
    [`${SECONDARY_BUTTON} &`]: {
      color: COLORS.NEUTRAL_DARK[400],
    },
    [`${SECONDARY_BUTTON}:active &`]: {
      color: COLORS.NEUTRAL_DARK[800],
    },
  },
});
