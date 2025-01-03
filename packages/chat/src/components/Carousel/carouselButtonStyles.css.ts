import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';
import { buttonStyles } from '../Button/styles.css';
import { CARD_WIDTH } from '../Card/styles.css';
import { MESSAGE_PADDING } from '../SystemResponse/styles.css';
import { BUTTON_SIZE, carouselContainer } from './styles.css';

const xOrigin = 'translateX(0)';
const fadeInFromLeft = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-10px)',
  },
  to: {
    opacity: 1,
    transform: xOrigin,
  },
});

const fadeOutToLeft = keyframes({
  from: {
    opacity: 1,
    transform: xOrigin,
  },
  to: {
    opacity: 0,
    transform: 'translateX(-10px)',
  },
});

const fadeInFromRight = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(10px)',
  },
  to: {
    opacity: 1,
    transform: xOrigin,
  },
});

const fadeOutToRight = keyframes({
  from: {
    opacity: 1,
    transform: xOrigin,
  },
  to: {
    opacity: 0,
    transform: 'translateX(10px)',
  },
});

export const buttonWrapper = recipe({
  base: {
    backgroundColor: 'transparent',
    height: BUTTON_SIZE + 6,
    width: BUTTON_SIZE + 6,
    padding: 2,
    position: 'absolute',
    top: '64px',
  },

  variants: {
    direction: {
      right: {
        [`.${carouselContainer} &`]: {
          left: `${SMALL_AVATAR_SIZE + MESSAGE_PADDING + (CARD_WIDTH - BUTTON_SIZE / 2) - 2}px`,
        },
      },
      left: {
        [`.${carouselContainer} &`]: {
          left: `${-(BUTTON_SIZE / 2) + SMALL_AVATAR_SIZE + MESSAGE_PADDING - 2}px`,
        },
      },
    },
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
    withAvatar: {
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        visible: true,
        direction: 'left',
      },
      style: {
        opacity: 1,
        animation: `${fadeInFromLeft} .15s ease-in`,
      },
    },
    {
      variants: {
        direction: 'left',
        withAvatar: false,
      },
      style: {
        [`.${carouselContainer} &`]: {
          left: `${-(BUTTON_SIZE / 2) - 2}px`,
        },
      },
    },
    {
      variants: {
        visible: false,
        direction: 'left',
      },
      style: {
        opacity: 0,
        animation: `${fadeOutToLeft} .15s ease-in`,
      },
    },

    {
      variants: {
        visible: true,
        direction: 'right',
      },
      style: {
        opacity: 1,
        animation: `${fadeInFromRight} .15s ease-in`,
      },
    },
    {
      variants: {
        direction: 'right',
        withAvatar: false,
      },
      style: {
        [`.${carouselContainer} &`]: {
          left: `${CARD_WIDTH - BUTTON_SIZE / 2 - 2}px`,
        },
      },
    },
    {
      variants: {
        visible: false,
        direction: 'right',
      },
      style: {
        opacity: 0,
        animation: `${fadeOutToRight} .15s ease-in`,
      },
    },
  ],
});

export const carouselButton = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      borderRadius: '50%',
      color: COLORS.NEUTRAL_DARK[100],
      border: `solid 1px ${COLORS.NEUTRAL_LIGHT[100]}`,
      backgroundColor: COLORS.white,
      boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.06)',
      transition: transition(['opacity', 'color', 'transform']),
      ':hover': {
        color: COLORS.NEUTRAL_DARK[600],
        transform: 'scale(1.15)',
      },
      ':active': {
        color: COLORS.NEUTRAL_DARK[800],
        transform: 'scale(0.8)',
      },
    },
  ],
});

export const rotate180 = style({
  transform: 'rotate(180deg)',
});
