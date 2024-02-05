import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.TIMESTAMP);

const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    typo: { size: 12, height: '17px' },
    color: '$darkGrey',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  });
  return <Styled {...props} />;
};

export default Container;
