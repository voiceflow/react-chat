import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

export const chatContainer = style({
  backgroundColor: COLORS.white,
  borderRadius: '16px',
  border: `.5px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  position: 'relative', // Ensure chat container is relatively positioned
  boxShadow:
    '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 40px 64px -32px rgba(22, 26, 30, 0.12)',
  display: 'flex',
  flexDirection: 'column',
});

export const scrollableArea = style({
  overflowY: 'auto',
  flex: '1 1 auto', // Allow it to grow and shrink within flexbox layout

  height: '545px',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const chatContent = style({});

const baseMessage = style({
  display: 'flex',
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
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

export const footerContainer = style({
  bottom: 0,
  width: '100%',
  borderBottomRightRadius: '12px',
  borderBottomLeftRadius: '24px',
});

export const scrollToButton = style({
  position: 'absolute',
  bottom: '97px ',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});
