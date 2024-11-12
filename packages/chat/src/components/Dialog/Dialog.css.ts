import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const dialogContainer = recipe({
  base: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    paddingBottom: '63px',
    paddingTop: '0px',
  },
  variants: {
    showPoweredBy: {
      false: {
        paddingBottom: '46px',
      },
    },
  },
});

export const messagesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  paddingBottom: '0px',
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
    isFirst: {
      true: {
        marginTop: '0px',
      },
    },
  },
});
export const userMessage = recipe({
  base: [baseMessage, { alignSelf: 'flex-end' }],
  variants: {
    isFirst: {
      true: {
        marginTop: '0px',
      },
    },
  },
});

export const avatarContainer = style({
  marginRight: '12px',
  display: 'flex',
  alignItems: 'flex-end',
});
