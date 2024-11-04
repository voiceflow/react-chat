import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';
import { CARD_WIDTH } from '../Card/styles.css';
import { BUTTON_SIZE, carouselContainer } from './styles.css';

export const carouselButton = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      height: BUTTON_SIZE,
      width: BUTTON_SIZE,
      color: COLORS.NEUTRAL_DARK[100],
      border: `solid 1px ${COLORS.NEUTRAL_LIGHT[100]}`,
      backgroundColor: COLORS.white,
      boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.06)',
      transition: transition(['color', 'transform']),
      ':hover': {
        color: COLORS.NEUTRAL_DARK[600],
        transform: 'scale(1.15)',
      },
      ':active': {
        color: COLORS.NEUTRAL_DARK[800],
        transform: 'scale(0.8)',
      },

      // When the buttons are inside a carousel
      [`.${carouselContainer} &`]: {
        position: 'absolute',
        top: '64px',
      },
    },
  ],

  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },

    direction: {
      right: {
        [`.${carouselContainer} &`]: {
          left: `${CARD_WIDTH - BUTTON_SIZE / 2}px`,
        },
      },
      left: {
        [`.${carouselContainer} &`]: {
          left: `-${BUTTON_SIZE / 2}px`,
        },
      },
    },
  },
});

export const rotate180 = style({
  transform: 'rotate(180deg)',
});
