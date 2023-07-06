import AssistantInfo from '@/components/AssistantInfo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import Prompt from '@/components/Prompt';
import SystemResponse from '@/components/SystemResponse';
import Timestamp from '@/components/Timestamp';
import UserResponse from '@/components/UserResponse';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { createTransition, CSS, fadeIn, shift, styled } from '@/styles';

const PROMPT_OVERFLOW = 10;
const SHIFT_DISTANCE = 12;

const animationStyles = ({ distance = SHIFT_DISTANCE, duration, delay }: { distance?: number; duration: number; delay: number }): CSS => ({
  opacity: 0,
  animation: [fadeIn, shift(distance)].map((animation) => `${animation} ${duration}ms ease-out ${delay}ms forwards`).join(', '),
});

const tag = tagFactory(ClassName.CHAT);

export const Overlay = styled(tag('div', 'overlay'), {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '$shadow12',
});

export const Container = styled(tag('article'), {
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  backgroundColor: '$white',

  [`& > ${Loader}`]: {
    margin: 'auto',
  },

  [`& ${Header.Container}`]: {
    animation: `${fadeIn} 150ms ease forwards`,
  },

  [`& ${Footer.Container}`]: {
    ...animationStyles({ duration: 300, delay: 300 }),
  },

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
    transition: `transform 320ms cubic-bezier(0.45, 1.29, 0.64, 1), ${createTransition(['box-shadow'], 300)}`,
    transform: `translateY(calc(100% + ${PROMPT_OVERFLOW}px))`,
  },

  variants: {
    withPrompt: {
      true: {
        [`& ${Overlay}`]: {
          opacity: 1,
          zIndex: 2,
          pointerEvents: 'auto',
        },

        [`& ${Prompt.Container}`]: {
          zIndex: 3,
          transform: `translateY(${PROMPT_OVERFLOW}px)`,
        },
      },
      false: {
        [`& ${Prompt.Container}`]: {
          boxShadow: 'none',
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

export const Status = styled(tag('div', 'status'), {
  ...statusStyles,
});

export const SessionTime = styled(tag('span', 'session-time'), {
  ...statusStyles,
  paddingBottom: '$3',
});

export const Dialog = styled(tag('main', 'dialog'), {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  paddingBottom: '$3',

  [`
    & ${UserResponse.Container},
    & ${SystemResponse.List},
    & ${SystemResponse.Actions},
    & ${AssistantInfo.Container}
  `]: {
    ...animationStyles({ duration: 150, delay: 0 }),
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
    & ${SystemResponse.Actions} + ${UserResponse.Container},
    & ${UserResponse.Container} + ${SystemResponse.Controls} + ${SystemResponse.Container}
  `]: {
    marginTop: '$5',
  },

  [`& ${Timestamp.Container}`]: { width: 50 },

  [`& ${Status}`]: {
    marginTop: '$3',
    marginBottom: 8,
  },
});

export const Spacer = styled(tag('div', 'spacer'), {
  flexGrow: 1,
});
