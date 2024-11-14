import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';
import { MESSAGE_PADDING } from '../SystemResponse/styles.css';

const fadeInSlideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const messageContainer = recipe({
  base: {
    fontFamily: FAMILY,
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'flex-end',
  },
  variants: {
    isFirst: {
      true: {
        marginTop: '0px',
      },
      false: {
        marginTop: '16px',
      },
    },
  },
});

export const messageRow = recipe({
  base: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '16px',
    animation: `${fadeInSlideUp} 0.3s ease-out`,
  },
  variants: {
    isFirst: {
      true: {
        marginTop: '0px',
      },
      false: {
        marginTop: '16px',
      },
    },
    hasAvatar: {
      true: {
        paddingLeft: `${SMALL_AVATAR_SIZE + MESSAGE_PADDING}px`,
      },
    },
  },
});

export const messageStyle = style({
  display: 'inline-block',
  padding: '10px 14px',
  borderRadius: SIZES.radius.sm,
  overflowWrap: 'anywhere',
  color: PALETTE.colors[50],
  backgroundColor: PALETTE.colors[500],
  whiteSpace: 'break-spaces',
});

export const debugMessage = style({
  fontSize: '12px',
  lineHeight: '17px',
  color: COLORS.NEUTRAL_DARK[200],
  marginTop: SIZES.m,
});
