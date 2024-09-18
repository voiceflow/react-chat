import { styled } from '@/styles';

import { Container as BaseContainer, tag } from '../styled';

const CARET_HEIGHT = 6;
const OFFSET = 32;

export const Container = styled(tag(BaseContainer, 'debug'), {
  position: 'relative',
  marginTop: CARET_HEIGHT,
  border: '1px solid $medGrey',
  padding: '10px 14px',
  backgroundColor: '$white',
  boxShadow: '0 1px 2px $shadow2',

  svg: {
    position: 'absolute',
    top: -CARET_HEIGHT,
  },

  variants: {
    orientation: {
      left: {
        svg: {
          left: OFFSET,
        },
      },
      right: {
        svg: {
          right: OFFSET,
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'left',
  },
});
