import Button from '@/components/Button';
import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.PROMPT);

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    padding: '$4 $4 $3 $4',
    borderRadius: '$1',
    backgroundColor: '$white',
    boxShadow: '0 12px 48px 4px $shadow12',

    [`& ${Button.Container}`]: {
      width: '100%',
      marginTop: '$1',

      '&:first-of-type': {
        marginTop: 0,
      },
    },
  });
  return <Styled {...props} />;
};
