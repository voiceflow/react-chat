import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.ICON);

export const Frame = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), { display: 'flex' });
  return <Styled {...props} />;
};
