import { CSS, styled } from '@/styles';

import { Container } from './styled';

const SIZE = 16;
const OFFSET = 32;

const caretStyles: CSS = {
  content: '',
  position: 'absolute',
  height: 0,
  width: 0,
  borderLeft: `${SIZE / 2}px solid transparent`,
  borderRight: `${SIZE / 2}px solid transparent`,
  borderTop: `${SIZE / 2}px solid transparent`,
};

export const DebugMessage = styled(Container, {
  position: 'relative',
  marginTop: SIZE / 2,
  border: '1px solid $medGrey',
  padding: '10px 14px',
  backgroundColor: '$white',
  boxShadow: '0 1px 2px $shadow2',

  '&::before': {
    ...caretStyles,
    top: -SIZE,
    borderBottom: `${SIZE / 2}px solid $medGrey`,
  },

  '&::after': {
    ...caretStyles,
    top: -SIZE + 1.5,
    borderBottom: `${SIZE / 2}px solid $white`,
  },

  variants: {
    orientation: {
      left: {
        '&::before': {
          left: OFFSET,
        },
        '&::after': {
          left: OFFSET,
        },
      },
      right: {
        '&::before': {
          right: OFFSET,
        },
        '&::after': {
          right: OFFSET,
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'left',
  },
});
