import { keyframes, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const chatContainer = style({
  backgroundColor: COLORS.white,
  borderRadius: '16px',
  border: `.5px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  position: 'relative',
  boxShadow:
    '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 40px 64px -32px rgba(22, 26, 30, 0.12)',
});

export const scrollableArea = style({
  overflowY: 'auto',
  height: '559px',
  width: '100%',
  display: 'block',
});

export const chatContent = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
  marginBottom: '40px',
});

export const footerContainer = style({
  position: 'absolute',
  bottom: 0,
  width: '100%',
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const agentMessage = style({
  alignSelf: 'flex-start',
  justifyContent: 'flex-end',
  display: 'flex',
  marginBottom: '16px',
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});

export const avatarContainer = style({
  marginRight: '12px',
  display: 'flex',
  alignItems: 'flex-end',
});

export const userMessage = style({
  alignSelf: 'flex-end',
  backgroundColor: '#f0f0f0',
  textAlign: 'left',
  marginBottom: '16px',
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});

export const scrollToButtomButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 0,
  animation: `${fadeIn} .15s ease-in`,
});
