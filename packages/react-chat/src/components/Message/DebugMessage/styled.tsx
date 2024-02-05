import { useStitches } from '@/contexts';

import { Container as BaseContainer, tag } from '../styled';

const CARET_HEIGHT = 6;
const OFFSET = 32;

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(BaseContainer, 'debug'), {
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
  return <Styled {...props} />;
};
