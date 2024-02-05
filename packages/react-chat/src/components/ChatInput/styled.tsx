import Bubble from '@/components/Bubble';
import Icon from '@/components/Icon';
import { textareaFocusStyles, textareaStyles } from '@/components/Textarea/styled';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';

import Textarea from '../Textarea';
import { useStitches } from '@/contexts';

const tag = tagFactory(ClassName.CHAT_INPUT);

export const ButtonContainer = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('label', 'button'), {
    ...textareaStyles,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8px',
    width: '$md',
    borderRadius: '$1',
    boxSizing: 'border-box',
    cursor: 'text',

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
          },
        },
      },
    },
  });
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
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
  return <Styled {...props} />;
};
