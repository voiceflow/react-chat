import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

export const tag = tagFactory(ClassName.BUTTON);

export const Reset = (props) => {
  const { styled } = useStitches();
  const Styled = styled('button', {
    border: 0,
    padding: 0,

    '&:focus': {
      outline: 0,
    },

    '&:hover': {
      cursor: 'pointer',
    },
  });
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Reset), {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 14px',
    borderRadius: '$1',
    typo: { weight: '$2' },
    whiteSpace: 'nowrap',
    overflowWrap: 'anywhere',
  });
  return <Styled {...props} />;
};
