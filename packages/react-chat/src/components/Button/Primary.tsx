import { useStitches } from '@/contexts';

import { ButtonVariant } from './constants';
import { Container, tag } from './styled';

export const PrimaryButton = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Container, ButtonVariant.PRIMARY), {
    height: '$md',
    color: '$white',
    trans: ['background-color'],

    variants: {
      type: {
        info: {
          backgroundColor: '$primary',

          '&:hover': {
            backgroundColor: '$darkPrimary',
          },
        },

        warn: {
          backgroundColor: '$warn',

          '&:hover': {
            backgroundColor: '$darkWarn',
          },
        },

        subtle: {
          color: '$black',
          backgroundColor: 'inherit',
          trans: ['color'],

          '&:hover': {
            color: '#000',
          },
        },
      },
    },
    defaultVariants: {
      type: 'info',
    },
  });
  return <Styled {...props} />;
};
