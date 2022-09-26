import Message from '@/components/Message';
import Prompt from '@/components/Prompt';
import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';
import { CSS, shift, styled } from '@/styles';

const PROMPT_OVERFLOW = 10;

export const Overlay = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  backgroundColor: '$shadow12',
});

export const Container = styled('article', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: 380,
  borderRadius: '$2',
  overflow: 'hidden',
  backgroundColor: '$white',
  boxShadow: '0 2px 48px rgba(19,33,68,0.12), 0 0 0 1px $shadow4',

  [`& ${Overlay}`]: {
    opacity: 0,
    pointerEvents: 'none',
    trans: ['opacity'],
  },

  [`& ${Prompt.Container}`]: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    paddingBottom: `calc($3 + ${PROMPT_OVERFLOW}px)`,
    transition: 'transform 320ms cubic-bezier(0.45, 1.29, 0.64, 1)',
    transform: `translateY(calc(100% + ${PROMPT_OVERFLOW}px))`,
  },

  variants: {
    withPrompt: {
      true: {
        [`& ${Overlay}`]: {
          opacity: 1,
          pointerEvents: 'auto',
        },
        [`& ${Prompt.Container}`]: {
          transform: `translateY(${PROMPT_OVERFLOW}px)`,
        },
      },
    },
  },
});

const statusStyles: CSS = {
  display: 'flex',
  justifyContent: 'center',
  typo: { size: 12 },
  color: '$darkGrey',
};

export const Status = styled('div', {
  ...statusStyles,
});

export const Dialog = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  paddingBottom: '$3',

  [`
    & ${SystemResponse.List} > *,
    & ${Message.Container},
    & > ${SystemResponse.Actions}
  `]: {
    anim: [shift],
  },

  [`
    & > ${UserResponse.Container},
    & > ${SystemResponse.Container}
  `]: {
    padding: '0 $5',
  },

  [`& > ${SystemResponse.Actions}`]: {
    padding: '0 $5 0 54px',
  },

  [`& ${SystemResponse.Container}`]: {
    marginBottom: '$1',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },

  [`& ${UserResponse.Container} + ${UserResponse.Container}`]: {
    marginTop: '$1',
  },

  [`
    & ${SystemResponse.Container} + ${UserResponse.Container},
    & ${UserResponse.Container} + ${SystemResponse.Container}
  `]: {
    marginTop: '$5',
  },

  [`& ${Status}`]: {
    marginTop: '$3',
    marginBottom: 8,
  },
});

export const Spacer = styled('div', {
  flexGrow: 1,
});

export const Timestamp = styled('span', {
  ...statusStyles,
  paddingBottom: '$3',
});
