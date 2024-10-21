import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';
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
      },
      ':active': {
        color: COLORS.NEUTRAL_DARK[800],
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
        transform: 'none',
        ':hover': {
          transform: 'scale(1.15)',
        },
        ':active': {
          transform: 'scale(0.8)',
        },
        [`.${carouselContainer} &`]: {
          right: '23px',
        },
      },
      left: {
        transform: 'rotate(180deg)',
        ':hover': {
          transform: 'rotate(180deg) scale(1.15)',
        },
        ':active': {
          transform: 'rotate(180deg) scale(0.8)',
        },
        [`.${carouselContainer} &`]: {
          left: '3px',
        },
      },
    },
  },
});
