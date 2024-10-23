import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const messagesContainer = recipe({
  base: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    padding: '20px',
    paddingBottom: '63px',
    paddingTop: '0px',
    backgroundColor: COLORS.white,
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px',
  },
  variants: {
    showPoweredBy: {
      false: {
        paddingBottom: '46px',
      },
    },
  },
});

const baseMessage = style({
  display: 'flex',
  animation: `${fadeIn} .15s ease-in`,
  alignSelf: 'flex-start',
  justifyContent: 'flex-end',
  marginTop: '16px',
});

export const agentMessage = recipe({
  base: [
    baseMessage,
    {
      alignSelf: 'flex-start',
    },
  ],
  variants: {
    tight: {
      true: {
        marginTop: '4px',
      },
    },
  },
});
export const userMessage = recipe({
  base: [baseMessage, { alignSelf: 'flex-end' }],
  variants: {
    tight: {
      true: {
        marginTop: '4px',
      },
    },
  },
});

export const avatarContainer = style({
  marginRight: '12px',
  display: 'flex',
  alignItems: 'flex-end',
});
