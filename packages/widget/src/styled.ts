import { CSS, styled } from '@voiceflow/react-chat/build/cjs/styles';

const CHAT_WIDTH = 380;
const MAX_CHAT_HEIGHT = 800;

export const ChatContainer = styled('div', {
  width: CHAT_WIDTH,
  overflow: 'hidden',
  borderRadius: '$2',
  boxShadow: '0 2px 48px rgba(19,33,68,0.12), 0 0 0 1px $shadow4',

  height: '90%',
  maxHeight: MAX_CHAT_HEIGHT,
});

export const ButtonContainer = styled('div', {});

export const Button = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$round',
  backgroundColor: '$primary',
  trans: ['background-color', 'box-shadow'],

  height: '$xl',
  width: '$xl',
  border: '1px solid $shadow4',
  boxShadow: '0 1px 6px $shadow6, 0 2px 24px $shadow8',

  '&:focus': {
    outline: 0,
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$darkPrimary',
  },

  '& > img': {
    width: '$sm',
    height: '$sm',
  },

  padding: 0,
  margin: 0,
});

export const ChatIframe = styled('iframe', {
  width: '100%',
  height: '100%',
  border: 'none',
});

const animateInStyles: CSS = {
  opacity: 1,
  pointerEvents: 'auto',
  transform: 'translateY(0%)',
  transition: 'transform 300ms cubic-bezier(0, 0.95, 0.1, 1), opacity 150ms linear',
};

const animateOutStyles: CSS = {
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(100%)',
  transition: 'transform 300ms cubic-bezier(0.85, 0, 0.6, 1), opacity 150ms linear',
};

export const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  pointerEvents: 'none',
  zIndex: 10000,

  [`
    & > ${ButtonContainer},
    & > ${ChatContainer}
  `]: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },

  variants: {
    withChat: {
      true: {
        [`& > ${ChatContainer}`]: {
          ...animateInStyles,
        },
        [`& > ${ButtonContainer}`]: {
          ...animateOutStyles,
        },
      },
      false: {
        [`& > ${ChatContainer}`]: {
          ...animateOutStyles,
        },
        [`& > ${ButtonContainer}`]: {
          ...animateInStyles,
        },
      },
    },
    isHidden: {
      true: {
        display: 'none',
      },
    },
  },
});
