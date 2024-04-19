import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
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
  alignItems: 'top',
  width: '$md',
  borderRadius: '$1',
  boxSizing: 'border-box',
  cursor: 'text',

  [`& ${Button.Container}`]: {
    minHeight: 'auto',
    height: 32,
    width: 32,
    padding: 0,
    margin: 4,
    textAlign: 'center',
  },
});

export const InputBarContainer = styled(tag('div'), {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'top',

  [`& ${Bubble.Container}`]: {
    height: '32px',
    width: '32px',
    margin: '5px 0 5px 12px',

    [`& ${Icon.Frame}`]: {
      color: '$white',
    },
  },
});

export const InputContainer = styled(tag('div'), {
  display: 'flex',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color', 'box-shadow'],

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

  [`& ${Textarea.Container}:focus`]: {
    ...textareaFocusStyles,
    borderRightWidth: 0,
  },

  [`& ${Textarea.Container}:focus + ${ButtonContainer}`]: {
    ...textareaFocusStyles,
    borderLeftWidth: 0,
  },
});
