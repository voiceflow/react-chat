import Bubble from '@/components/Bubble';
import Icon from '@/components/Icon';
import { textareaFocusStyles, textareaStyles } from '@/components/Textarea/styled';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

import Textarea from '../Textarea';

const tag = tagFactory(ClassName.CHAT_INPUT);

export const ButtonContainer = styled(tag('label', 'button'), {
  ...textareaStyles,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '8px',
  width: '$md',
  borderRadius: '$1',
  boxSizing: 'border-box',
  cursor: 'text',
  pointerEvents: 'none',

  [`& ${Bubble.Container}`]: {
    transform: 'scale(0)',
    marginTop: 'auto',
    trans: ['background-color', 'transform'],
  },

  variants: {
    ready: {
      true: {
        [`& ${Bubble.Container}`]: {
          transform: 'scale(1)',
          cursor: 'pointer',
          pointerEvents: 'all',
        },
      },
    },
  },
});

export const Container = styled(tag('div'), {
  display: 'flex',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color', 'box-shadow'],
  position: 'relative',

  [`& ${Textarea.Container}`]: {
    ...textareaStyles,
    minHeight: '$md',
    margin: 0,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 7,
    boxShadow: 'none',
  },

  [`& ${ButtonContainer}`]: {
    height: 'inherit',
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  [`& ${Icon.Frame}`]: {
    color: '$white',
  },

  [`& ${Textarea.Container}:focus`]: {
    ...textareaFocusStyles,
    borderRightWidth: 0,
  },

  [`& ${Textarea.Container}:focus + ${ButtonContainer}`]: {
    ...textareaFocusStyles,
    borderLeftWidth: 0,
  },
});

export const AutoInputButtonContainer = styled(tag('button'), {
  width: '$md',
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 0,

  [`&& ${Icon.Frame}`]: {
    color: '$darkGrey',
    opacity: 0.8,
    trans: ['opacity', 'color'],
  },

  '&:hover': {
    [`&& ${Icon.Frame}`]: {
      opacity: 1,
    },
  },

  '&:active': {
    [`&& ${Icon.Frame}`]: {
      color: '$black',
      opacity: 1,
    },
  },

  variants: {
    listening: {
      true: {
        [`&& ${Icon.Frame}`]: {
          color: '$warn',
        },

        '&:active': {
          [`&& ${Icon.Frame}`]: {
            color: '$warn',
          },
        },
      },
    },

    disabled: {
      true: {
        cursor: 'not-allowed',

        [`&& ${Icon.Frame}`]: {
          opacity: 0.5,
        },
      },
    },
  },
});
