import TextareaAutosize from 'react-textarea-autosize';

import { useStitches } from '@/contexts';
import { CSS } from '@/styles';

export const textareaUniqueStyles: CSS = {
  width: 'calc(100% - 42px)',
  borderRadius: '$1 0 0 $1',
  height: '42px',
  borderRightWidth: 0,
  fontFamily: '$default',
  fontSize: '$2',
};

export const textareaStyles: CSS = {
  boxSizing: 'border-box',
  border: '1px solid rgba(115,115,118,0.3)',
  backgroundColor: '$white',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color'],
  resize: 'none',
};

export const textareaFocusStyles: CSS = {
  border: '1px solid rgba(115,115,118,0.5)',
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(TextareaAutosize, {
    ...textareaStyles,
    ...textareaUniqueStyles,
    // TODO use tokens
    padding: '9px $4 10px',
    color: '$black',

    '&:focus': {
      ...textareaFocusStyles,
      ...textareaUniqueStyles,
      outline: 'none',
    },

    '&::placeholder': {
      color: '$darkGrey',
    },
  });
  return <Styled {...props} />;
};
