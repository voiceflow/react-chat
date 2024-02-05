import { useStitches } from '@/contexts';
import { ButtonVariant } from './constants';
import { Container, tag } from './styled';

export const SecondaryButton = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Container, ButtonVariant.SECONDARY), {
    height: '$sm',
    border: '1px solid $fadedPrimary',
    color: '$primary',
    backgroundColor: '$white',
    boxShadow: '0 1px 2px $shadow2',
    trans: ['border-color'],

    '&:hover': {
      borderColor: '$primary',
    },
  });
  return <Styled {...props} />;
};
